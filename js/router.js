const routes = new Set(["dashboard", "contacts", "leads", "students", "courses", "enquiries", "admissions", "tasks", "reports", "settings"]);

export function currentRoute() {
  const route = location.hash.replace(/^#\/?/, "").toLowerCase();
  return routes.has(route) ? route : "dashboard";
}

export function navigate(route) {
  const target = route.toLowerCase();
  if (!routes.has(target)) return;
  if (currentRoute() === target) window.dispatchEvent(new CustomEvent("app:navigate", { detail: target }));
  else location.hash = `/${target}`;
}

export function listenToRoutes(callback) {
  const handle = () => callback(currentRoute());
  window.addEventListener("hashchange", handle);
  window.addEventListener("app:navigate", handle);
  handle();
  return () => {
    window.removeEventListener("hashchange", handle);
    window.removeEventListener("app:navigate", handle);
  };
}
