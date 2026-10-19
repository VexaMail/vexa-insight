import type { ReportDmarcOutcome, ReportStats } from '@/types/reports'

/** The list view's outcome totals, derived from one report's stats. */
export function toReportDmarcOutcome(stats: ReportStats): ReportDmarcOutcome {
  return {
    totalMessages: stats.totalMessages,
    failingMessages: stats.totalMessages - stats.dmarcPassCount,
    partiallyAlignedMessages: stats.dmarcPassCount - stats.bothAlignedCount,
  }
}
