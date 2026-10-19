import type { DispositionTotals, ReportSource } from '@/types/reports'

/** Messages of a report by what the receiver did: none, quarantine, reject. */
export function sumDispositions(
  sources: readonly ReportSource[],
): DispositionTotals {
  const totals = { none: 0, quarantine: 0, reject: 0 }
  for (const source of sources) {
    if (source.disposition === 'quarantine') {
      totals.quarantine += source.messageCount
    } else if (source.disposition === 'reject') {
      totals.reject += source.messageCount
    } else {
      totals.none += source.messageCount
    }
  }
  return totals
}
