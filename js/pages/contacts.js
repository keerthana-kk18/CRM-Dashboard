import { entityPage } from "./entity-page.js";

export function render({ state, viewState }) {
  return entityPage("contacts", state, viewState, "RELATIONSHIPS ARE THE WORK");
}
