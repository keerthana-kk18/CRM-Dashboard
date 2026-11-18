import { escapeHTML, icon, money, shortDate, statusClass } from "../utils.js";

export function render({ state }) {
  const stages = ["Review", "Documents", "Enrolled"];
  return `<section class="page-view admissions-page">
    <header class="entity-heading"><div><p class="eyebrow">THE MOMENT IT BECOMES REAL</p><h1 class="display-title">A place at the table<span class="title-period">.</span></h1><p>Bring every promising application through the door with clarity and care.</p></div><span class="record-summary"><strong>${state.admissions.length}</strong> applications in motion</span></header>
    <section class="admission-pipeline">${stages.map((stage,index)=>`<article class="pipeline-stage"><span class="pipeline-no">0${index+1}</span><div><small>${escapeHTML(stage.toUpperCase())}</small><strong>${state.admissions.filter(item=>item.status===stage).length}</strong></div><span class="pipeline-line"></span></article>`).join("")}</section>
    <section class="admission-feature"><div><p class="eyebrow">THIS WEEK’S MOMENTUM</p><h2>${state.admissions.filter(item=>item.status==="Enrolled").length} learners have found their next thing.</h2><p>Enrollment is a beginning, not a finish line. Keep the welcome warm.</p></div><div class="admission-orbit" aria-hidden="true"><span>WELCOME<br/>IN</span></div></section>
    <section class="data-panel surface"><header class="data-panel-head"><div><p class="panel-kicker">APPLICATION TRACKER</p><h2>Recently admitted</h2></div><span class="data-count">${state.admissions.length} applications</span></header>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Student</th><th>Course</th><th>Applied</th><th>Tuition</th><th>Payment</th><th>Stage</th></tr></thead><tbody>${state.admissions.map(item=>`<tr><td><div class="person-cell">${icon("cap", "icon admission-person-icon")}<span class="person-meta"><strong>${escapeHTML(item.student)}</strong><small>${escapeHTML(item.email)}</small></span></div></td><td>${escapeHTML(item.course)}</td><td>${shortDate(item.date)}</td><td>${money(item.amount)}</td><td><span class="status-chip ${statusClass(item.payment)}">${escapeHTML(item.payment)}</span></td><td><select class="admission-select" data-admission-status="${escapeHTML(item.id)}" aria-label="Update ${escapeHTML(item.student)} admission status">${stages.map(stage=>`<option value="${stage}" ${item.status===stage?"selected":""}>${stage}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>
      <footer class="data-panel-foot"><span>Each application is a future in the making.</span><button class="text-link" type="button" data-route="students">View students ${icon("arrow-right")}</button></footer>
    </section>
  </section>`;
}
