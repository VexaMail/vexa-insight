import { REPORT_HISTORY_LENGTH } from '@/constants/reports'
import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { ReportAlignmentCounts, ReportRow } from '@/types/reports'
import { and, desc, eq, lte } from 'drizzle-orm'
import { reportAlignmentSelection } from './reportAlignmentSelection'

/**
 * Alignment counts of the latest reports the same receiver sent about the
 * report's first domain, up to and including this one, oldest first: the
 * history behind the sparklines of the report KPI tiles.
 */
export async function getReportHistory(
  report: ReportRow,
): Promise<ReportAlignmentCounts[]> {
  const domainId = report.relatedDomains?.[0]?.domainId
  if (domainId === undefined) return []

  const rows = await getDb()
    .select(reportAlignmentSelection)
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(rawReports.id, normalizedEvents.rawReportId))
    .where(
      and(
        eq(rawReports.orgName, report.orgName),
        eq(normalizedEvents.domainId, domainId),
        lte(rawReports.beginDate, report.beginDate),
      ),
    )
    .groupBy(rawReports.id)
    .orderBy(desc(rawReports.beginDate), desc(rawReports.id))
    .limit(REPORT_HISTORY_LENGTH)

  return rows.reverse()
}
