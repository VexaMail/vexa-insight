import type { NormalizedEventSummary } from '../contracts'

/** Total message count of the events that match the predicate. */
export function sumEventCounts(
  events: readonly NormalizedEventSummary[],
  predicate: (event: NormalizedEventSummary) => boolean,
): number {
  return events.filter(predicate).reduce((sum, ev) => sum + ev.count, 0)
}
