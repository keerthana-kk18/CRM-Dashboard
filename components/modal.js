import { escapeHTML, icon } from "../js/utils.js";

function optionsMarkup(field, value) {
  const options = field.options || [];
  return `<select name="${escapeHTML(field.key)}" ${field.required ? "required" : ""} class="field-control">${field.required ? "" : '<option value="">Choose one…</option>'}
    ${options.map(option => `<option value="${escapeHTML(option)}" ${String(value) === String(option) ? "selected" : ""}>${escapeHTML(option)}</option>`).join("")}</select>`;
}

function fieldMarkup(field, value = "") {
  const required = field.required ? "required" : "";
  const control = field.type === "select" ? optionsMarkup(field, value)
    : field.type === "textarea" ? `<textarea name="${escapeHTML(field.key)}" class="field-control" rows="3" ${required}>${escapeHTML(value)}</textarea>`
      : `<input class="field-control" name="${escapeHTML(field.key)}" type="${escapeHTML(field.type || "text")}" value="${escapeHTML(value)}" ${required} ${field.min !== undefined ? `min="${field.min}"` : ""} ${field.max !== undefined ? `max="${field.max}"` : ""} ${field.maxLength ? `maxlength="${field.maxLength}"` : ""} />`;
  return `<label class="modal-field ${field.wide ? "wide" : ""}"><span>${escapeHTML(field.label)}${field.required ? ' <b class="required">*</b>' : ""}</span>${control}</label>`;
}

export function recordModalMarkup(entity, config, record = {}) {
  const editing = Boolean(record.id);
  return `<div class="modal-backdrop" id="record-modal" role="presentation">
    <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="modal-top"><div><p class="eyebrow">${editing ? "UPDATE RECORD" : `NEW ${config.singular.toUpperCase()}`}</p><h2 id="modal-title">${editing ? "A little update." : `Add a ${config.singular}.`}</h2><p>Good details make thoughtful follow-up possible.</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Close dialog">${icon("close")}</button></header>
      <form id="record-form" data-entity="${entity}" data-id="${escapeHTML(record.id || "")}">
        <div class="modal-grid">${config.fields.map(field => fieldMarkup(field, record[field.key] ?? "")).join("")}</div>
        <footer class="modal-footer"><button class="button button-quiet" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${editing ? "Save changes" : `Add ${config.singular}`}${icon("arrow-right")}</button></footer>
      </form>
    </section>
  </div>`;
}

export function detailsModalMarkup(record, config) {
  const name = record.name || record.title || record.student || "Record details";
  return `<div class="modal-backdrop" id="record-modal" role="presentation"><section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <header class="modal-top"><div><p class="eyebrow">${escapeHTML(config.singular.toUpperCase())} SNAPSHOT</p><h2 id="modal-title">${escapeHTML(name)}</h2><p>A quick view of this relationship.</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Close dialog">${icon("close")}</button></header>
    <div class="modal-details">${config.fields.map(field => `<div class="detail-pair"><small>${escapeHTML(field.label)}</small><strong>${escapeHTML(record[field.key] || "—")}</strong></div>`).join("")}</div>
    <footer class="modal-footer"><button class="button button-quiet" type="button" data-action="close-modal">Close</button><button class="button button-primary" type="button" data-action="edit-record" data-entity="${config.entity}" data-id="${escapeHTML(record.id)}">Edit ${config.singular}</button></footer>
  </section></div>`;
}
