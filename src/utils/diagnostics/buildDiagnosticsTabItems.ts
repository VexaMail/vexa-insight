import {
  diagnosticsTabIcons,
  diagnosticsTabLabels,
  diagnosticsTabOrder,
} from '@/constants/diagnostics'
import type { DiagnosticsLinkBase } from '@/types/diagnostics'
import type { TabNavItem } from '@/types/ui'
import { diagnosticsTabHref } from './diagnosticsTabHref'

/** The page tabs; the record generator is new in this release. */
export function buildDiagnosticsTabItems(
  base: DiagnosticsLinkBase,
): TabNavItem[] {
  return diagnosticsTabOrder.map((key) => ({
    key,
    label: diagnosticsTabLabels[key],
    href: diagnosticsTabHref({ ...base, tab: key }),
    icon: diagnosticsTabIcons[key],
    ...(key === 'generator' ? { badge: 'New' } : {}),
  }))
}
