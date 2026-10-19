import { protocolOrder } from '@/constants/diagnostics'
import type { DiagnosticsFinding } from '@/types/diagnostics'

export function sortFindingsByProtocol<
  T extends Pick<DiagnosticsFinding, 'id'>,
>(findings: readonly T[]): T[] {
  return findings.toSorted(
    (left, right) =>
      protocolOrder.indexOf(left.id) - protocolOrder.indexOf(right.id),
  )
}
