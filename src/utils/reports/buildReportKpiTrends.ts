import type { ReportAlignmentCounts, ReportKpiTrends } from '@/types/reports'
import { percentOf } from './percentOf'

/** The sparkline series of the report tiles, one point per report. */
export function buildReportKpiTrends(
  history: readonly ReportAlignmentCounts[],
): ReportKpiTrends {
  return {
    messages: history.map((h) => h.totalMessages),
    spfAligned: history.map((h) =>
      percentOf(h.spfAlignedCount, h.totalMessages),
    ),
    dkimAligned: history.map((h) =>
      percentOf(h.dkimAlignedCount, h.totalMessages),
    ),
    dmarcPass: history.map((h) => percentOf(h.dmarcPassCount, h.totalMessages)),
  }
}
