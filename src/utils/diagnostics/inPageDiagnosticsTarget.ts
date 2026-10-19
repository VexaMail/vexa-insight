import { withoutTabParam } from './withoutTabParam'

/**
 * The link's URL when it only changes the tab or the anchor of the diagnostics
 * page being shown, so it can switch panels without a new server run; null for
 * any link that changes the domain, the window or the page.
 */
export function inPageDiagnosticsTarget(
  href: string,
  current: URL,
): URL | null {
  const target = new URL(href, current)
  if (
    target.origin !== current.origin ||
    target.pathname !== current.pathname
  ) {
    return null
  }
  return withoutTabParam(target.searchParams) ===
    withoutTabParam(current.searchParams)
    ? target
    : null
}
