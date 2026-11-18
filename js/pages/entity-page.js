import { entityConfig } from "../data.js";
import { renderDataTable } from "../../components/data-table.js";
import { escapeHTML, icon } from "../utils.js";

function visibleRecords(entity, state, view) {
  const config = entityConfig[entity];
  const query = view.search.trim().toLowerCase();
  return state[entity].filter(record => {
    const matchesQuery = !query || config.searchFields.some(key => String(record[key] || "").toLowerCase().includes(query));
    const matchesFilter = view.filter === "all" || String(record[config.filterField] || "").toLowerCase() === view.filter.toLowerCase();
    return matchesQuery && matchesFilter;
  }).sort((a, b) => {
    const left = String(a[view.sort] ?? "").toLowerCase();
    const right = String(b[view.sort] ?? "").toLowerCase();
    const result = left.localeCompare(right, undefined, { numeric: true });
    return view.direction === "desc" ? -result : result;
  });
}

export function entityPage(entity, state, viewState, eyebrow) {
  const config = entityConfig[entity];
  const view = viewState[entity];
  const matches = visibleRecords(entity, state, view);
  const start = (view.page - 1) * view.pageSize;
  const rows = matches.slice(start, start + view.pageSize);
  const columns = config.columns;
  const isContact = entity === "contacts";
  return `<section class="page-view entity-view">
    <header class="entity-heading">
      <div><p class="eyebrow">${escapeHTML(eyebrow || "LEARNING COMMUNITY")}</p><h1 class="display-title">${escapeHTML(config.label)}<span class="title-period">.</span></h1><p>${escapeHTML(config.description)}</p></div>
      <div class="entity-head-actions"><span class="record-summary"><strong>${state[entity].length}</strong> ${escapeHTML(config.label.toLowerCase())} in your orbit</span><button class="button button-primary" type="button" data-action="add-record" data-entity="${entity}">${icon("plus")}Add ${escapeHTML(config.singular)}</button></div>
    </header>
    ${isContact ? `<section class="entity-insight-strip"><span class="insight-glyph">${icon("spark")}</span><p><strong>Good relationships start with remembering.</strong> Search, filter and update the details that keep your community connected.</p><span class="insight-tail">PEOPLE FIRST</span></section>` : ""}
    <section class="data-panel surface">
      <header class="data-panel-head"><div><p class="panel-kicker">${escapeHTML(config.label.toUpperCase())} DIRECTORY</p><h2>${isContact ? "Your people" : `All ${escapeHTML(config.label.toLowerCase())}`}</h2></div><span class="data-count">${matches.length} ${matches.length === 1 ? "record" : "records"}</span></header>
      <div class="entity-toolbar">
        <label class="search-box">${icon("search")}<input type="search" data-entity-search="${entity}" placeholder="Search ${escapeHTML(config.label.toLowerCase())}…" value="${escapeHTML(view.search)}" /></label>
        <select class="filter-select" data-entity-filter="${entity}" aria-label="Filter ${escapeHTML(config.label)}"><option value="all">${escapeHTML(config.filterLabel)}</option>${config.filters.map(item => `<option value="${escapeHTML(item)}" ${view.filter.toLowerCase() === item.toLowerCase() ? "selected" : ""}>${escapeHTML(item)}</option>`).join("")}</select>
        <button class="icon-button filter-reset" type="button" data-action="clear-entity-filters" data-entity="${entity}" aria-label="Clear filters" title="Clear filters">${icon("sliders")}</button>
        <span class="toolbar-spacer"></span><button class="button button-quiet export-entity" type="button" data-action="export-entity" data-entity="${entity}">${icon("download")}Export</button>
      </div>
      ${renderDataTable({ entity, rows, columns, page: view.page, pageSize: view.pageSize, total: matches.length, sortKey: view.sort })}
    </section>
  </section>`;
}
