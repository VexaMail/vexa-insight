import type { DiagnosticsSectionId } from '@/types/diagnostics'
import { diagnosticsSectionDomId } from './diagnosticsSectionDomId'

/**
 * Moves focus and the viewport to a detail section after it has been opened.
 * Deferred one frame so the section body is in the DOM before scrolling.
 */
export function scrollToDiagnosticsSection(id: DiagnosticsSectionId): void {
  requestAnimationFrame(() => {
    const element = document.getElementById(diagnosticsSectionDomId(id))
    if (!element) return
    element.focus({ preventScroll: true })
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
