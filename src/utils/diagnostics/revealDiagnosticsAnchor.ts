import { waitForShownElement } from '@/utils/ui'

/**
 * Scrolls to the element a `#hash` names once the panel holding it is shown,
 * and moves focus there so keyboard users land where the link pointed.
 */
export async function revealDiagnosticsAnchor(hash: string): Promise<void> {
  if (hash.length <= 1) return
  const element = await waitForShownElement(decodeURIComponent(hash.slice(1)))
  if (!element) return
  element.scrollIntoView({ block: 'start' })
  element.focus({ preventScroll: true })
}
