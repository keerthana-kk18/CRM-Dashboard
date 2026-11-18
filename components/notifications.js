import { escapeHTML, icon } from "../js/utils.js";

export function notificationMarkup(items) {
  return `<section class="notification-panel" id="notification-panel" aria-label="Notifications">
    <header class="notification-heading"><div><p class="eyebrow">YOUR INBOX</p><h3>A few things to know.</h3></div><button class="icon-button" type="button" data-action="close-popover" aria-label="Close notifications">${icon("close")}</button></header>
    ${items.length ? items.map(item => `<article class="notification-item"><span class="notification-mark" style="${item.unread ? "" : "opacity:.18"}"></span><div><p><strong>${escapeHTML(item.title)}</strong></p><small>${escapeHTML(item.detail)}</small></div></article>`).join("") : '<p class="empty-note">You’re all caught up.</p>'}
    <button class="text-link notification-clear" type="button" data-action="mark-notifications">Mark all as read ${icon("arrow-right")}</button>
  </section>`;
}

export function profileMenuMarkup() {
  return `<section class="profile-menu" id="profile-menu" aria-label="Profile actions">
    <button type="button" data-action="profile-settings">${icon("users")}Account profile</button>
    <button type="button" data-route="settings">${icon("settings")}Preferences</button>
    <button type="button" data-action="sign-out">${icon("logout")}Sign out</button>
  </section>`;
}
