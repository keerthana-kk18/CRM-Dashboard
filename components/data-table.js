import { escapeHTML, icon, initials, shortDate, statusClass } from "../js/utils.js";

function renderCell(record, column) {
  const raw = record[column.key];
  if (column.type === "person") {
    const palette = ["", "coral", "sage", "gold", "blue"];
    const colorIndex = (String(record.id || "").charCodeAt(0) + String(record.id || "").length) % palette.length;
    return `<div class="person-cell"><span class="person-avatar ${palette[colorIndex]}">${escapeHTML(initials(raw))}</span><span class="person-meta"><strong>${escapeHTML(raw || "Unnamed")}</strong><small>${escapeHTML(record[column.subKey] || "")}</small></span></div>`;
  }
  if (column.type === "status") return `<span class="status-chip ${statusClass(raw)}">${escapeHTML(raw || "—")}</span>`;
  if (column.type === "date") return escapeHTML(shortDate(raw));
  if (column.type === "progress") return `<div class="progress-cell"><span class="progress-track"><i style="width:${Math.max(0, Math.min(100, Number(raw) || 0))}%"></i></span><strong>${Math.max(0, Math.min(100, Number(raw) || 0))}%</strong></div>`;
  if (column.type === "category") return `<span class="category-label"><i></i>${escapeHTML(raw || "—")}</span>`;
  return escapeHTML(raw ?? "—");
}

export function renderDataTable({ entity, rows, columns, page, pageSize, total, sortKey }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const header = columns.map(column => `<th scope="col">${column.sortable === false
    ? escapeHTML(column.label)
    : `<button type="button" data-action="sort" data-key="${escapeHTML(column.key)}" data-entity="${entity}">${escapeHTML(column.label)}${sortKey === column.key ? icon("chevron", "icon sort-indicator") : ""}</button>`}</th>`).join("");
  const body = rows.length ? rows.map(record => `<tr data-record-id="${escapeHTML(record.id)}">
    ${columns.map(column => `<td>${renderCell(record, column)}</td>`).join("")}
    <td class="action-cell"><div class="row-actions">
      <button class="row-action" type="button" data-action="details" data-entity="${entity}" data-id="${escapeHTML(record.id)}" aria-label="View ${escapeHTML(record.name || record.title || record.student || "record")} details">${icon("arrow-right")}</button>
      <button class="row-action" type="button" data-action="edit-record" data-entity="${entity}" data-id="${escapeHTML(record.id)}" aria-label="Edit record">${icon("edit")}</button>
      <button class="row-action danger" type="button" data-action="delete-record" data-entity="${entity}" data-id="${escapeHTML(record.id)}" aria-label="Delete record">${icon("trash")}</button>
    </div></td>
  </tr>`).join("") : `<tr><td class="table-empty" colspan="${columns.length + 1}"><div class="empty-state"><span class="empty-orbit">${icon("search")}</span><h3>No matching ${entity}</h3><p>Try a different search or clear the current filters to see all records.</p></div></td></tr>`;
  const start = total ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, total);
  const pages = Array.from({ length: pageCount }, (_, index) => {
    const pageNumber = index + 1;
    if (pageCount > 5 && Math.abs(pageNumber - page) > 1 && pageNumber !== 1 && pageNumber !== pageCount) return "";
    return `<button type="button" class="page-btn ${pageNumber === page ? "active" : ""}" data-action="page" data-page="${pageNumber}" data-entity="${entity}" ${pageNumber === page ? 'aria-current="page"' : ""}>${pageNumber}</button>`;
  }).join("");
  return `<div class="table-wrap"><table class="data-table"><thead><tr>${header}<th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>${body}</tbody></table></div>
    <footer class="data-panel-foot"><span>Showing <strong>${start}–${end}</strong> of ${total} ${entity}</span><div class="pagination">
      <button type="button" class="page-btn" data-action="page" data-page="${page - 1}" data-entity="${entity}" aria-label="Previous page" ${page <= 1 ? "disabled" : ""}>‹</button>${pages}
      <button type="button" class="page-btn" data-action="page" data-page="${page + 1}" data-entity="${entity}" aria-label="Next page" ${page >= pageCount ? "disabled" : ""}>›</button>
    </div></footer>`;
}
