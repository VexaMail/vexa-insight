import type { NormalizedEventSummary } from '../contracts'

/** "none: 12, quarantine: 3" style breakdown, in first-seen order. */
export function summarizeDispositions(
  events: readonly NormalizedEventSummary[],
): string {
  const dispositionCounts = new Map<string, number>()
  for (const ev of events) {
    dispositionCounts.set(
      ev.disposition,
      (dispositionCounts.get(ev.disposition) ?? 0) + ev.count,
    )
  }
  return [...dispositionCounts.entries()]
    .map(([d, c]) => `${d}: ${String(c)}`)
    .join(', ')
}
