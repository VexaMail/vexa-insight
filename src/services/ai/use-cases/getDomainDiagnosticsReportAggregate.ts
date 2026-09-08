import { toIsoDayFromUnixSeconds } from '@/utils/dates'
import type { DiagnosticsReportAggregate } from '../contracts/DiagnosticsReportAggregate'
import { diagnosticsEventFilter } from './diagnosticsAggregate/diagnosticsEventFilter'
import { queryDiagnosticsTotals } from './diagnosticsAggregate/queryDiagnosticsTotals'
import { queryDispositionBreakdown } from './diagnosticsAggregate/queryDispositionBreakdown'
import { queryForwardedOverrideCount } from './diagnosticsAggregate/queryForwardedOverrideCount'
import { queryOrgCount } from './diagnosticsAggregate/queryOrgCount'
import { queryTopOrgs } from './diagnosticsAggregate/queryTopOrgs'

/**
 * Aggregates all DMARC report data for a domain within an optional date range.
 * Uses SUM(count) weighting for correct message-level statistics.
 */
export async function getDomainDiagnosticsReportAggregate(
  domainId: number,
  startDate?: Date,
  endDate?: Date,
): Promise<DiagnosticsReportAggregate | null> {
  const whereClause = diagnosticsEventFilter(domainId, startDate, endDate)

  const totals = await queryDiagnosticsTotals(whereClause)
  if (!totals || totals.totalMessages === 0) {
    return null
  }

  return {
    reportCount: totals.reportCount,
    orgCount: await queryOrgCount(whereClause),
    totalMessages: totals.totalMessages,
    spfPassCount: totals.spfPassCount,
    dkimPassCount: totals.dkimPassCount,
    spfAlignedCount: totals.spfAlignedCount,
    dkimAlignedCount: totals.dkimAlignedCount,
    dispositionBreakdown: await queryDispositionBreakdown(whereClause),
    topOrgs: await queryTopOrgs(whereClause),
    forwardedOverrideCount: await queryForwardedOverrideCount(whereClause),
    dateRange: {
      start: toIsoDayFromUnixSeconds(totals.minDate),
      end: toIsoDayFromUnixSeconds(totals.maxDate),
    },
  }
}
