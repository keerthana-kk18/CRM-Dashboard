export const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[character]));

export const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
export const initials = (name = "") => name.trim().split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase();
export const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0);
export const shortDate = value => {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
};
export const todayISO = () => new Date().toISOString().slice(0, 10);
export const newId = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
export const personAvatar = (name, color = "") => `<span class="person-avatar ${escapeHTML(color)}">${escapeHTML(initials(name))}</span>`;
export const statusClass = status => String(status || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
