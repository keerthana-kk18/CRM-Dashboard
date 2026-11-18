export function logoMarkup({ compact = false } = {}) {
  return `<span class="brand-mark logo-hover" aria-hidden="true">
    <span class="dot-logo"><i></i><i></i><i></i></span>
  </span>${compact ? "" : '<span class="brand-wordmark"><small>OPEN</small><strong>Learn Suite</strong></span>'}`;
}
