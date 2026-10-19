import { protocolOrder } from '@/constants/diagnostics'
import type { DiagnosticsFinding } from '@/types/diagnostics'

export function sortFindingsByProtocol(
  findings: readonly DiagnosticsFinding[],
): DiagnosticsFinding[] {
  return findings.toSorted(
    (left, right) =>
      protocolOrder.indexOf(left.id) - protocolOrder.indexOf(right.id),
  )
}
