import {
  diagnosticsTabLabels,
  diagnosticsTabOrder,
} from '@/constants/diagnostics'
import type { DiagnosticsLinkBase } from '@/types/diagnostics'
import type { TabNavItem } from '@/types/ui'
import { diagnosticsTabHref } from './diagnosticsTabHref'

/** The page tabs; Findings carries the number of checks that need action. */
export function buildDiagnosticsTabItems(
  base: DiagnosticsLinkBase,
  actionable: number,
): TabNavItem[] {
  return diagnosticsTabOrder.map((key) => ({
    key,
    label: diagnosticsTabLabels[key],
    href: diagnosticsTabHref({ ...base, tab: key }),
    ...(key === 'findings' ? { count: actionable } : {}),
  }))
}
