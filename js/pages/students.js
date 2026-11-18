import { entityPage } from "./entity-page.js";

export function render({ state, viewState }) {
  const active = state.students.filter(student => student.status === "Learning").length;
  const completed = state.students.filter(student => student.status === "Completed").length;
  return `<section class="page-view">
    <div class="student-ribbon"><div><p class="eyebrow">LEARNER SNAPSHOT</p><h2>Progress is a practice.</h2></div><div class="student-ribbon-stats"><span><strong>${active}</strong><small>In progress</small></span><i></i><span><strong>${completed}</strong><small>Recently completed</small></span></div></div>
    ${entityPage("students", state, viewState, "LEARNER COMMUNITY")}
  </section>`;
}
