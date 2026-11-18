import { entityPage } from "./entity-page.js";
import { icon } from "../../js/utils.js";

export function render({ state, viewState }) {
  const followUps = state.enquiries.filter(enquiry => enquiry.status === "Follow-up" || enquiry.status === "New").length;
  return `<section class="page-view">
    <div class="enquiry-banner surface"><span class="enquiry-banner-icon">${icon("message")}</span><div><p class="eyebrow">FIRST IMPRESSIONS, KEPT HUMAN</p><h2>There’s a person behind every question.</h2><p>${followUps} conversations could use a thoughtful next step.</p></div><span class="enquiry-count"><strong>${state.enquiries.length}</strong><small>open conversations</small></span></div>
    ${entityPage("enquiries", state, viewState, "INQUIRY TO POSSIBILITY")}
  </section>`;
}
