import { renderShell, updateShell } from "../components/shell.js";
import { recordModalMarkup, detailsModalMarkup } from "../components/modal.js";
import { notificationMarkup, profileMenuMarkup } from "../components/notifications.js";
import { mountDashboardCharts, mountReportCharts, clearCharts } from "../components/charts.js";
import { entityConfig, seedData } from "./data.js";
import { currentRoute, listenToRoutes, navigate } from "./router.js";
import { loadWorkspace, saveWorkspace } from "./storage.js";
import { escapeHTML, newId, todayISO } from "./utils.js";
import * as Dashboard from "./pages/dashboard.js";
import * as Contacts from "./pages/contacts.js";
import * as Leads from "./pages/leads.js";
import * as Students from "./pages/students.js";
import * as Courses from "./pages/courses.js";
import * as Enquiries from "./pages/enquiries.js";
import * as Admissions from "./pages/admissions.js";
import * as Tasks from "./pages/tasks.js";
import * as Reports from "./pages/reports.js";
import * as Settings from "./pages/settings.js";

const pageModules = { dashboard: Dashboard, contacts: Contacts, leads: Leads, students: Students, courses: Courses, enquiries: Enquiries, admissions: Admissions, tasks: Tasks, reports: Reports, settings: Settings };
const entityRoutes = ["contacts", "leads", "students", "courses", "enquiries", "tasks"];
const mobileDrawerQuery = window.matchMedia("(max-width: 920px)");
const state = loadWorkspace();
const viewState = Object.fromEntries(entityRoutes.map(entity => [entity, {
  search: "", filter: "all", page: 1, pageSize: 7, sort: entity === "tasks" ? "title" : "name", direction: "asc"
}]));

const appRoot = document.getElementById("app");
appRoot.className = "";
appRoot.innerHTML = renderShell();

function persist(message = "Your workspace is up to date.") {
  if (!saveWorkspace(state)) {
    showToast("This change could not be saved in this browser.", "error");
    return false;
  }
  if (message) showToast(message);
  return true;
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.innerHTML = `${type === "error" ? "!" : '<span aria-hidden="true">✦</span>'}<span>${escapeHTML(message)}</span>`;
  document.getElementById("toast-root").appendChild(toast);
  window.setTimeout(() => toast.remove(), 3400);
}

function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach(node => {
    const target = Number(node.dataset.counter);
    if (!Number.isFinite(target) || target <= 0) return;
    const started = performance.now();
    const duration = 800;
    const format = node.dataset.format;
    const tick = now => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      node.textContent = format === "money" ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value) : value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function renderCurrentPage(route = currentRoute()) {
  clearCharts();
  closePopover();
  setSidebarOpen(false);
  updateShell(route, state);
  const module = pageModules[route] || Dashboard;
  const page = document.getElementById("page-view");
  page.innerHTML = module.render({ state, viewState, navigate });
  page.scrollTop = 0;
  if (route === "dashboard") {
    animateCounters();
    mountDashboardCharts();
  }
  if (route === "reports") mountReportCharts();
  if (route === "settings") page.querySelectorAll("[data-preference]").forEach(input => input.addEventListener("change", handlePreferenceChange));
}

function closePopover() {
  document.querySelectorAll(".notification-panel, .profile-menu, .quick-menu, .search-results").forEach(element => element.remove());
}

function setSidebarOpen(open) {
  const isDrawer = mobileDrawerQuery.matches;
  const isOpen = isDrawer && open;
  const sidebar = document.getElementById("sidebar");
  document.body.classList.toggle("sidebar-open", isOpen);
  const menuButton = document.querySelector(".mobile-menu");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  sidebar.inert = isDrawer && !isOpen;
  if (isDrawer && !isOpen) sidebar.setAttribute("aria-hidden", "true");
  else sidebar.removeAttribute("aria-hidden");
}

function openModal(entity, record = null) {
  const config = entityConfig[entity];
  if (!config) return;
  const overlay = document.getElementById("modal-root");
  overlay.innerHTML = recordModalMarkup(entity, config, record || {});
  document.body.classList.add("modal-open");
  const firstField = overlay.querySelector("input:not([type=hidden]), select, textarea");
  window.setTimeout(() => firstField?.focus(), 30);
}

function openDetails(entity, id) {
  const record = state[entity]?.find(item => item.id === id);
  if (!record || !entityConfig[entity]) return;
  document.getElementById("modal-root").innerHTML = detailsModalMarkup(record, { ...entityConfig[entity], entity });
  document.body.classList.add("modal-open");
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
  document.body.classList.remove("modal-open");
}

function openQuickMenu(button) {
  closePopover();
  const rect = button.getBoundingClientRect();
  const menu = document.createElement("section");
  menu.className = "popover quick-menu";
  menu.style.top = `${Math.min(rect.bottom + 10, window.innerHeight - 280)}px`;
  menu.style.right = `${Math.max(14, window.innerWidth - rect.right)}px`;
  menu.innerHTML = `<p class="popover-heading">MAKE A LITTLE PROGRESS</p>
    ${[["contacts","Contact","users"],["leads","Lead","target"],["students","Student","cap"],["courses","Course","book"],["enquiries","Enquiry","message"],["tasks","Task","check"]].map(([entity,label,symbol])=>`<button class="popover-item" type="button" data-action="add-record" data-entity="${entity}">${`<svg class="icon" aria-hidden="true"><use href="#i-${symbol}"></use></svg>`}New ${label}</button>`).join("")}`;
  document.body.appendChild(menu);
}

function openSearchResults(query) {
  closePopover();
  const matches = [];
  const target = query.trim().toLowerCase();
  if (!target) return;
  const searchables = [
    ["contacts", state.contacts, ["name","email","organization"]],
    ["leads", state.leads, ["name","email","course"]],
    ["students", state.students, ["name","email","course"]],
    ["courses", state.courses, ["name","category","trainer"]],
    ["enquiries", state.enquiries, ["name","email","course"]]
  ];
  searchables.forEach(([entity, items, keys]) => {
    items.filter(item => keys.some(key => String(item[key] || "").toLowerCase().includes(target))).slice(0, 2).forEach(item => {
      matches.push({ entity, name: item.name, info: item.email || item.course || item.category });
    });
  });
  const panel = document.createElement("div");
  panel.className = "popover search-results";
  panel.style.position = "fixed";
  const searchRect = document.querySelector(".global-search").getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const panelWidth = Math.min(320, viewportWidth - 24);
  const right = Math.min(Math.max(12, viewportWidth - searchRect.right), viewportWidth - panelWidth - 12);
  const top = Math.min(searchRect.bottom + 8, window.innerHeight - Math.min(360, window.innerHeight - 24) - 12);
  panel.style.top = `${Math.max(12, top)}px`;
  panel.style.right = `${right}px`;
  panel.style.width = `${panelWidth}px`;
  panel.innerHTML = `<p class="popover-heading">IN YOUR LEARNING STUDIO</p>${matches.length ? matches.slice(0, 6).map(item=>`<button class="popover-item search-result" type="button" data-route="${item.entity}" data-search-term="${escapeHTML(query)}"><span class="search-result-label">${escapeHTML(item.entity)}</span><span class="search-result-copy"><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.info || "")}</small></span></button>`).join("") : '<p class="search-no-results">No matches yet. Try a name, email or course.</p>'}`;
  document.body.appendChild(panel);
}

function updateEntityView(entity, render = true) {
  if (render) renderCurrentPage(entity);
}

function handleSearchInput(input) {
  const entity = input.dataset.entitySearch;
  const view = viewState[entity];
  if (!view) return;
  view.search = input.value;
  view.page = 1;
  const cursor = input.selectionStart;
  renderCurrentPage(entity);
  const replacement = document.querySelector(`[data-entity-search="${entity}"]`);
  replacement?.focus();
  replacement?.setSelectionRange(cursor, cursor);
}

function handlePreferenceChange(event) {
  const key = event.currentTarget.dataset.preference;
  const previous = state.preferences[key];
  state.preferences[key] = event.currentTarget.checked;
  if (!saveWorkspace(state)) {
    state.preferences[key] = previous;
    event.currentTarget.checked = previous;
    showToast("This preference could not be saved in this browser.", "error");
    return;
  }
  document.body.classList.toggle("theme-dark", Boolean(state.preferences.darkMode));
  showToast(`${event.currentTarget.checked ? "Enabled" : "Disabled"} ${key === "darkMode" ? "evening studio" : key === "emailUpdates" ? "weekly email updates" : "follow-up reminders"}.`);
}

function recordDefaults(entity, record) {
  const id = record.id || newId(entity.slice(0, 2));
  const today = todayISO();
  const defaults = {
    contacts: { category: "Learner", status: "Prospect", updated: today },
    leads: { source: "Website", owner: "Maya Chen", status: "New", priority: "Medium", followUp: today },
    students: { enrolled: today, progress: 0, payment: "Pending", status: "Learning" },
    courses: { enrolled: 0, duration: "6 weeks", status: "Draft", art: ["plum","peach","sage","gold","blue","rose"][state.courses.length % 6], symbol: "✳" },
    enquiries: { source: "Website", owner: "Maya Chen", date: today, status: "New", followUp: today },
    tasks: { due: today, owner: "Maya Chen", priority: "Medium", done: false, related: "" }
  };
  const normalized = { ...defaults[entity], ...record, id };
  for (const [key, value] of Object.entries(normalized)) {
    if (entityConfig[entity].fields.some(field => field.key === key) && typeof value === "string" && value.trim() === "") delete normalized[key];
  }
  if (entity === "students" || entity === "courses") normalized.enrolled = Number(normalized.enrolled || 0);
  if (entity === "students") normalized.progress = Number(normalized.progress || 0);
  return normalized;
}

function handleRecordSubmit(form) {
  const entity = form.dataset.entity;
  const config = entityConfig[entity];
  if (!config || !form.reportValidity()) return;
  const formValues = new FormData(form);
  const record = {};
  config.fields.forEach(field => {
    const value = String(formValues.get(field.key) || "").trim();
    if (field.type === "number") record[field.key] = value === "" ? 0 : Number(value);
    else record[field.key] = value;
  });
  const id = form.dataset.id;
  const existing = state[entity].find(item => item.id === id);
  record.id = id || "";
  const candidate = recordDefaults(entity, { ...(existing || {}), ...record });

  if (["contacts","leads","students","enquiries"].includes(entity) && candidate.email) {
    const duplicate = state[entity].some(item => item.email?.toLowerCase() === candidate.email.toLowerCase() && item.id !== id);
    if (duplicate) {
      form.elements.email.setCustomValidity("A record with this email already exists.");
      form.elements.email.reportValidity();
      form.elements.email.addEventListener("input", () => form.elements.email.setCustomValidity(""), { once: true });
      return;
    }
  }
  if (existing) state[entity] = state[entity].map(item => item.id === id ? candidate : item);
  else state[entity].unshift(candidate);
  closeModal();
  const saved = saveWorkspace(state);
  if (currentRoute() === entity) renderCurrentPage(entity);
  else navigate(entity);
  showToast(saved ? `${config.singular[0].toUpperCase()}${config.singular.slice(1)} ${existing ? "updated" : "added"}.` : "The record changed for this session, but could not be saved.", saved ? "success" : "error");
}

function exportRecords(entity) {
  const records = state[entity];
  if (!records?.length) return showToast("There are no records to export.", "error");
  const keys = Object.keys(records[0]).filter(key => key !== "id");
  const csv = [keys, ...records.map(record => keys.map(key => record[key] ?? ""))]
    .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `open-learn-${entity}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast(`${records.length} ${entity} exported.`);
}

function exportReport() {
  const rows = [
    ["Open Learn Suite report", new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date())],
    ["Students", state.students.length],
    ["Active leads", state.leads.filter(lead => !["Won","Lost"].includes(lead.status)).length],
    ["Courses open", state.courses.filter(course => course.status === "Open").length],
    ["Admissions revenue", state.admissions.reduce((sum, item) => sum + Number(item.amount || 0), 0)]
  ];
  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "open-learn-suite-report.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Your report is ready.");
}

function handleClick(event) {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    const route = routeButton.dataset.route;
    const term = routeButton.dataset.searchTerm;
    if (term && viewState[route]) viewState[route].search = term;
    closePopover();
    if (currentRoute() === route) renderCurrentPage(route);
    else navigate(route);
    return;
  }
  const control = event.target.closest("[data-action]");
  if (!control) {
    if (!event.target.closest(".popover, .notification-panel, .profile-menu")) closePopover();
    return;
  }
  const { action, entity, id } = control.dataset;
  if (action === "collapse-sidebar") {
    const previous = state.preferences.compactSidebar;
    state.preferences.compactSidebar = !state.preferences.compactSidebar;
    document.body.classList.toggle("sidebar-collapsed", state.preferences.compactSidebar);
    if (!saveWorkspace(state)) {
      state.preferences.compactSidebar = previous;
      document.body.classList.toggle("sidebar-collapsed", previous);
      showToast("The sidebar preference could not be saved.", "error");
    }
  } else if (action === "mobile-menu") setSidebarOpen(!document.body.classList.contains("sidebar-open"));
  else if (action === "close-mobile-menu") setSidebarOpen(false);
  else if (action === "quick-create") openQuickMenu(control);
  else if (action === "add-record") { closePopover(); openModal(entity); }
  else if (action === "edit-record") {
    closeModal();
    const item = state[entity]?.find(record => record.id === id);
    if (item) openModal(entity, item);
  } else if (action === "details") openDetails(entity, id);
  else if (action === "delete-record") {
    const record = state[entity]?.find(item => item.id === id);
    const name = record?.name || record?.title || record?.student || "this record";
    if (record && window.confirm(`Remove ${name} from ${entity}? This cannot be undone.`)) {
      state[entity] = state[entity].filter(item => item.id !== id);
      persist(`${name} removed.`);
      renderCurrentPage();
    }
  } else if (action === "toggle-task") {
    const task = state.tasks.find(item => item.id === id);
    if (task) {
      task.done = !task.done;
      persist(task.done ? "One more good thing, done." : "Task moved back to your list.");
      renderCurrentPage();
    }
  } else if (action === "page") {
    if (!control.disabled) {
      viewState[entity].page = Number(control.dataset.page);
      renderCurrentPage(entity);
    }
  } else if (action === "sort") {
    const view = viewState[entity];
    view.direction = view.sort === control.dataset.key && view.direction === "asc" ? "desc" : "asc";
    view.sort = control.dataset.key;
    renderCurrentPage(entity);
  } else if (action === "clear-entity-filters") {
    viewState[entity].search = "";
    viewState[entity].filter = "all";
    viewState[entity].page = 1;
    renderCurrentPage(entity);
  } else if (action === "export-entity") exportRecords(entity);
  else if (action === "export-report") exportReport();
  else if (action === "notifications") {
    closePopover();
    document.body.insertAdjacentHTML("beforeend", notificationMarkup(state.notifications));
  } else if (action === "mark-notifications") {
    state.notifications.forEach(notification => { notification.unread = false; });
    persist("Inbox cleared. A little more breathing room.");
    document.getElementById("notification-panel")?.remove();
    updateShell(currentRoute(), state);
  } else if (action === "profile-menu") {
    closePopover();
    document.body.insertAdjacentHTML("beforeend", profileMenuMarkup());
  } else if (action === "sign-out") {
    closePopover();
    document.getElementById("login-screen").hidden = false;
  } else if (action === "close-modal") closeModal();
  else if (action === "close-popover") closePopover();
  else if (action === "profile-settings") { closePopover(); navigate("settings"); }
  else if (action === "save-profile") {
    const profile = {
      name: document.querySelector('[name="profile-name"]')?.value.trim() || "",
      email: document.querySelector('[name="profile-email"]')?.value.trim() || "",
      role: document.querySelector('[name="profile-role"]')?.value.trim() || "",
      timezone: document.querySelector('[name="timezone"]')?.value || ""
    };
    const email = document.querySelector('[name="profile-email"]');
    const name = document.querySelector('[name="profile-name"]');
    if (!name?.value.trim() || !email?.value.trim() || !email.checkValidity()) {
      (name?.value.trim() ? email : name)?.reportValidity();
      showToast("Enter a name and a valid work email before saving.", "error");
      return;
    }
    state.profile = profile;
    if (persist("Your profile details are saved.")) renderCurrentPage("settings");
  }
  else if (action === "profile-avatar") showToast("Profile photos can be connected in account settings.");
  else if (action === "workspace") showToast("You’re working in Open Learning Studio.");
  else if (action === "navigate") navigate(control.dataset.route);
  else if (action === "mobile-close") setSidebarOpen(false);
}

function handleChange(event) {
  const filter = event.target.dataset.entityFilter;
  if (filter) {
    viewState[filter].filter = event.target.value;
    viewState[filter].page = 1;
    renderCurrentPage(filter);
  }
  const admissionId = event.target.dataset.admissionStatus;
  if (admissionId) {
    const admission = state.admissions.find(item => item.id === admissionId);
    if (admission) {
      admission.status = event.target.value;
      persist("Admission stage updated.");
      renderCurrentPage("admissions");
    }
  }
  if (event.target.id === "report-period") {
    mountReportCharts(event.target.value === "12" ? "enrollment" : "revenue");
  }
}

function handleInput(event) {
  if (event.target.matches("[data-entity-search]")) {
    handleSearchInput(event.target);
    return;
  }
  if (event.target.id === "global-search") openSearchResults(event.target.value);
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
    closePopover();
    setSidebarOpen(false);
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("global-search").focus();
  }
  if (event.key === "Enter" && event.target.id === "global-search") {
    const match = document.querySelector(".search-result");
    if (match) match.click();
  }
}

document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
document.addEventListener("keydown", handleKeydown);
document.getElementById("sidebar-scrim").addEventListener("click", () => setSidebarOpen(false));
window.addEventListener("resize", () => setSidebarOpen(document.body.classList.contains("sidebar-open")));
mobileDrawerQuery.addEventListener("change", () => setSidebarOpen(false));
document.getElementById("modal-root").addEventListener("click", event => {
  if (event.target.id === "record-modal") closeModal();
});
document.getElementById("modal-root").addEventListener("submit", event => {
  if (event.target.id === "record-form") {
    event.preventDefault();
    handleRecordSubmit(event.target);
  }
});
document.getElementById("login-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  document.getElementById("login-screen").hidden = true;
  showToast("Welcome back to your learning studio.");
});
listenToRoutes(renderCurrentPage);

window.addEventListener("storage", event => {
  if (event.key && event.key.startsWith("open-learn-suite")) {
    Object.assign(state, loadWorkspace());
    renderCurrentPage();
  }
});
