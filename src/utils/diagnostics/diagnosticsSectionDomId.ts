import type { DiagnosticsSectionId } from '@/types/diagnostics'

/** DOM id of a diagnostics detail section, shared by the toggle and the scroll target. */
export function diagnosticsSectionDomId(id: DiagnosticsSectionId): string {
  return `diagnostics-section-${id}`
}
