import { logoMarkup } from "./logo.js";
import { icon, initials } from "../js/utils.js";

export const pageTitles = {
  dashboard: ["Your learning, in motion", "Dashboard"],
  contacts: ["People & relationships", "Contacts"],
  leads: ["A thoughtful next step", "Leads"],
  students: ["Every learner, in view", "Students"],
  courses: ["Ideas made teachable", "Courses"],
  enquiries: ["The first hello", "Enquiries"],
  admissions: ["From interest to belonging", "Admissions"],
  tasks: ["Small steps, real momentum", "Tasks"],
  reports: ["The bigger picture", "Reports"],
  settings: ["Make it yours", "Settings"]
};

const navigation = [
  { section: "YOUR WORKSPACE", links: [
    ["dashboard", "Dashboard", "grid"],
    ["contacts", "Contacts", "users"],
    ["leads", "Leads", "target"],
    ["students", "Students", "cap"],
    ["courses", "Courses", "book"],
    ["enquiries", "Enquiries", "message"],
    ["admissions", "Admissions", "badge"],
    ["tasks", "Tasks", "check"]
  ] },
  { section: "INSIGHTS", links: [["reports", "Reports", "chart"]] },
  { section: "PREFERENCES", links: [["settings", "Settings", "settings"]] }
];

export function renderShell() {
  const navMarkup = navigation.map(group => `<div class="nav-caption ${group.section !== "YOUR WORKSPACE" ? "spaced" : ""}">${group.section}</div>
    <nav class="side-nav" aria-label="${group.section.toLowerCase()} navigation">${group.links.map(([id, label, symbol]) =>
      `<button class="nav-link" type="button" data-route="${id}" data-tooltip="${label}" aria-label="${label}">${icon(symbol)}<span class="nav-label-text">${label}</span>${id === "tasks" ? '<span class="nav-count" id="task-count">4</span>' : ""}</button>`
    ).join("")}</nav>`).join("");

  return `<a class="skip-link" href="#page-view">Skip to content</a>
    <div class="app-shell" id="app-shell">
      <aside class="sidebar" id="sidebar" aria-label="Main navigation">
        <a href="#/dashboard" class="brand">${logoMarkup()}</a>
        <button class="sidebar-workspace" type="button" data-action="workspace" aria-label="Current workspace: Open Learning Studio">
          <span class="workspace-emblem">O</span><span class="workspace-copy"><strong>Open Learning Studio</strong><small>Learning workspace</small></span>${icon("chevron", "icon workspace-caret")}
        </button>
        ${navMarkup}
        <div class="sidebar-bottom">
          <button class="sidebar-profile" type="button" data-action="profile-menu" aria-haspopup="true">
            <span class="profile-avatar">JM</span><span class="profile-meta"><strong>Jordan Miller</strong><small>Workspace admin</small></span>${icon("more")}
          </button>
        </div>
      </aside>
      <button class="sidebar-scrim" id="sidebar-scrim" type="button" aria-label="Close navigation"></button>
      <div class="main-shell">
        <header class="topbar">
          <div class="topbar-leading">
            <button class="icon-button collapse-button" type="button" data-action="collapse-sidebar" aria-label="Collapse sidebar" title="Collapse sidebar">${icon("sliders")}</button>
            <button class="icon-button mobile-menu" type="button" data-action="mobile-menu" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${icon("menu")}</button>
            <div class="topbar-title-block"><p class="topbar-crumb">Open Learn Suite <span>/</span><span id="breadcrumb-current">Dashboard</span></p><h1 class="topbar-title" id="topbar-title">Your learning, in motion</h1></div>
          </div>
          <div class="topbar-tools">
            <label class="global-search">${icon("search")}<input type="search" id="global-search" placeholder="Search your workspace" autocomplete="off" aria-label="Search your workspace" /><kbd>⌘ K</kbd></label>
            <span class="topbar-date" id="topbar-date"></span>
            <span class="topbar-divider"></span>
            <button class="icon-button topbar-notify" type="button" data-action="notifications" aria-label="Notifications">${icon("bell")}<span class="unread-dot" id="unread-dot"></span></button>
            <button class="button button-dark quick-create" type="button" data-action="quick-create">${icon("plus")}<span>New</span></button>
            <button class="profile-avatar topbar-avatar" type="button" data-action="profile-menu" aria-label="Open profile menu">JM</button>
          </div>
        </header>
        <main class="main-content" id="page-view" tabindex="-1"></main>
      </div>
    </div>
    <div id="overlay-root"></div>
    <section class="login-screen" id="login-screen" hidden>
      <form class="login-card" id="login-form">
        <div class="login-brand">${logoMarkup()}</div>
        <p class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h1>Welcome back.</h1><p>Sign in to your learning workspace to pick up where you left off.</p>
        <label class="field-label">Work email<input class="field-control" type="email" name="email" required value="jordan@openlearn.studio" /></label>
        <label class="field-label">Password<input class="field-control" type="password" name="password" required value="learnsuite" /></label>
        <button class="button button-primary" type="submit">Enter your workspace ${icon("arrow-right")}</button>
      </form>
    </section>`;
}

export function updateShell(route, state) {
  const [title, label] = pageTitles[route] || pageTitles.dashboard;
  document.getElementById("topbar-title").textContent = title;
  document.getElementById("breadcrumb-current").textContent = label;
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.route === route);
    if (link.dataset.route === route) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.body.classList.toggle("theme-dark", Boolean(state.preferences.darkMode));
  const sidebarCollapsed = Boolean(state.preferences.compactSidebar);
  document.body.classList.toggle("sidebar-collapsed", sidebarCollapsed);
  const collapseButton = document.querySelector(".collapse-button");
  collapseButton.setAttribute("aria-label", sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar");
  collapseButton.setAttribute("title", sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar");
  collapseButton.setAttribute("aria-pressed", String(sidebarCollapsed));
  document.getElementById("task-count").textContent = String(state.tasks.filter(task => !task.done).length);
  document.querySelectorAll(".profile-meta strong").forEach(node => { node.textContent = state.profile.name; });
  document.querySelectorAll(".profile-meta small").forEach(node => { node.textContent = state.profile.role; });
  document.querySelectorAll(".profile-avatar").forEach(node => { node.textContent = initials(state.profile.name); });
  document.getElementById("unread-dot").hidden = !state.notifications.some(notification => notification.unread);
  document.getElementById("topbar-date").textContent = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(new Date());
}
