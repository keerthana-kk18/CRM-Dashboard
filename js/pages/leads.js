import { entityPage } from "./entity-page.js";
import { escapeHTML } from "../utils.js";

export function render({ state, viewState }) {
  const stages = ["New", "Contacted", "Qualified", "Proposal"];
  const total = state.leads.length || 1;
  const stagesMarkup = stages.map((stage, index) => {
    const amount = state.leads.filter(lead => lead.status === stage).length;
    return `<div class="lead-stage"><span>${escapeHTML(stage)}</span><div class="lead-stage-track"><i style="width:${Math.max(7, amount / total * 100)}%"></i></div><strong>${amount}</strong><small>${Math.round(amount / total * 100)}%</small></div>`;
  }).join("");
  const sources = [...new Set(state.leads.map(lead => lead.source))].map(source =>
    `<span class="source-pill">${escapeHTML(source)} <b>${state.leads.filter(lead => lead.source === source).length}</b></span>`
  ).join("");
  return `<section class="page-view">
    <div class="lead-insights"><article class="lead-note surface"><p class="eyebrow">PIPELINE MOMENTUM</p><h2>Start with a good question.</h2><p>Your next cohort is taking shape. A little follow-up today can turn into a big yes tomorrow.</p><div class="lead-stage-list">${stagesMarkup}</div></article>
    <article class="source-card surface"><p class="eyebrow">WHERE THEY FOUND YOU</p><h3>Good things travel.</h3><div class="source-list">${sources}</div><p class="source-foot">${state.leads.filter(lead => lead.priority === "High").length} high-priority conversations deserve a personal follow-up.</p></article></div>
    ${entityPage("leads", state, viewState, "FROM FIRST HELLO TO FIRST DAY")}
  </section>`;
}
