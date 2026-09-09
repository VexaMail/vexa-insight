import type { NormalizedEventSummary, ReportEventTotals } from '../contracts'
import { sumEventCounts } from './sumEventCounts'
import { summarizeDispositions } from './summarizeDispositions'

export function summarizeReportEvents(
  events: readonly NormalizedEventSummary[],
): ReportEventTotals {
  return {
    totalMessages: sumEventCounts(events, () => true),
    spfPassCount: sumEventCounts(events, (ev) => ev.spfResult === 'pass'),
    dkimPassCount: sumEventCounts(events, (ev) => ev.dkimResult === 'pass'),
    spfAlignedCount: sumEventCounts(events, (ev) => ev.spfAligned),
    dkimAlignedCount: sumEventCounts(events, (ev) => ev.dkimAligned),
    dispositionSummary: summarizeDispositions(events),
  }
}
