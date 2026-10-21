export function trackPublicEvent(
  name:
    | 'checker_started'
    | 'checker_completed'
    | 'checker_failed'
    | 'installation_click',
): void {
  window.dispatchEvent(
    new CustomEvent('vexa-public-analytics', { detail: name }),
  )
}
