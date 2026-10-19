import { diagnosticsSectionTabs } from '@/constants/diagnostics'
import type {
  DiagnosticsLinkBase,
  DiagnosticsSectionId,
} from '@/types/diagnostics'
import { diagnosticsSectionDomId } from './diagnosticsSectionDomId'
import { diagnosticsTabHref } from './diagnosticsTabHref'

/** Link that opens the tab holding a detail section and scrolls to it. */
export function diagnosticsSectionHref(
  base: DiagnosticsLinkBase,
  section: DiagnosticsSectionId,
): string {
  return diagnosticsTabHref({
    ...base,
    tab: diagnosticsSectionTabs[section],
    anchor: diagnosticsSectionDomId(section),
  })
}
