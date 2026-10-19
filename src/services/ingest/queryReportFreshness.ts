import { getDb, rawReports } from '@/lib/db'
import type { ReportFreshness } from '@/types/ingest'
import { sql } from 'drizzle-orm'

/** Newest report arrival and newest reporting-period end, across all reports. */
export async function queryReportFreshness(): Promise<ReportFreshness> {
  const [row] = await getDb()
    .select({
      lastIngestedAt: sql<number | null>`max(${rawReports.ingestedAt})`,
      lastPeriodEnd: sql<number | null>`max(${rawReports.endDate})`,
    })
    .from(rawReports)

  return {
    lastIngestedAt: row?.lastIngestedAt
      ? new Date(row.lastIngestedAt * 1000)
      : null,
    lastPeriodEnd: row?.lastPeriodEnd
      ? new Date(row.lastPeriodEnd * 1000)
      : null,
  }
}
