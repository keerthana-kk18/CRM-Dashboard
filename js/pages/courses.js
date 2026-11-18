import { entityConfig } from "../data.js";
import { escapeHTML, icon } from "../utils.js";

export function render({ state, viewState }) {
  const config = entityConfig.courses;
  const view = viewState.courses;
  const filtered = state.courses.filter(course => (!view.search || config.searchFields.some(key => String(course[key] || "").toLowerCase().includes(view.search.toLowerCase()))) && (view.filter === "all" || course.category === view.filter));
  return `<section class="page-view courses-page">
    <header class="entity-heading"><div><p class="eyebrow">LEARN SOMETHING THAT STICKS</p><h1 class="display-title">A shelf of possibilities<span class="title-period">.</span></h1><p>Small, focused courses made to help good people do meaningful work.</p></div><button class="button button-primary" type="button" data-action="add-record" data-entity="courses">${icon("plus")}Create a course</button></header>
    <div class="course-toolbar"><label class="search-box">${icon("search")}<input type="search" data-entity-search="courses" placeholder="Find a course, trainer, idea…" value="${escapeHTML(view.search)}" /></label><select class="filter-select" data-entity-filter="courses"><option value="all">Every subject</option>${config.filters.map(item => `<option ${view.filter === item ? "selected" : ""} value="${escapeHTML(item)}">${escapeHTML(item)}</option>`).join("")}</select><span class="toolbar-spacer"></span><span class="course-result-count">${filtered.length} learning experiences</span></div>
    <div class="course-grid">${filtered.length ? filtered.map(course => `<article class="course-card surface surface-hover">
      <div class="course-art ${escapeHTML(course.art || "plum")}"><span class="course-art-index">${escapeHTML(course.category)}</span><span class="course-symbol">${escapeHTML(course.symbol || "✳")}</span><span class="course-art-corner">OPEN LEARN / 0${String(course.id).slice(-1)}</span></div>
      <div class="course-card-body"><div class="course-meta"><span>${escapeHTML(course.duration || "Self-paced")}</span><span class="status-chip ${String(course.status).toLowerCase()}">${escapeHTML(course.status)}</span></div><h2>${escapeHTML(course.name)}</h2><p>${escapeHTML(course.description || "A practical, people-first course for your next chapter.")}</p>
        <div class="course-card-foot"><span class="trainer-avatar">${escapeHTML(course.trainer.split(" ").map(part => part[0]).join(""))}</span><span class="trainer-name">${escapeHTML(course.trainer)}</span><span class="course-students">${escapeHTML(course.enrolled || "0")} learners</span></div>
        <div class="course-card-actions"><button class="text-link" type="button" data-action="edit-record" data-entity="courses" data-id="${escapeHTML(course.id)}">Edit course ${icon("arrow-right")}</button><button class="row-action danger" type="button" data-action="delete-record" data-entity="courses" data-id="${escapeHTML(course.id)}" aria-label="Delete ${escapeHTML(course.name)}">${icon("trash")}</button></div>
      </div></article>`).join("") : `<div class="empty-state course-empty"><span class="empty-orbit">${icon("book")}</span><h3>No courses on this shelf yet.</h3><p>Start with one good idea and build from there.</p><button class="button button-primary" type="button" data-action="add-record" data-entity="courses">${icon("plus")}Create a course</button></div>`}</div>
  </section>`;
}
