import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { LatestDomainReport } from '@/types/domains'
import { inArray, sql } from 'drizzle-orm'

/**
 * The newest aggregate report of each domain, with the slice of its XML that
 * holds `policy_published`. SQLite returns the bare `raw_report_id` of the row
 * that holds the `max()`, so one grouped scan finds every latest report.
 */
export async function getLatestDomainReports(
  domainIds: readonly number[],
): Promise<LatestDomainReport[]> {
  if (domainIds.length === 0) return []
  const db = getDb()
  const latest = await db
    .select({
      domainId: normalizedEvents.domainId,
      rawReportId: normalizedEvents.rawReportId,
      endDate: sql<number>`max(${normalizedEvents.reportEndDate})`,
    })
    .from(normalizedEvents)
    .where(inArray(normalizedEvents.domainId, [...domainIds]))
    .groupBy(normalizedEvents.domainId)
  if (latest.length === 0) return []
  const reports = await db
    .select({
      id: rawReports.id,
      orgName: rawReports.orgName,
      snippet: sql<string>`substr(${rawReports.rawXml}, instr(${rawReports.rawXml}, '<policy_published>'), 800)`,
    })
    .from(rawReports)
    .where(
      inArray(
        rawReports.id,
        latest.map((row) => row.rawReportId),
      ),
    )
  const byId = new Map(reports.map((report) => [report.id, report]))
  return latest.flatMap((row) => {
    const report = byId.get(row.rawReportId)
    if (!report) return []
    const { orgName, snippet } = report
    return [{ domainId: row.domainId, endDate: row.endDate, orgName, snippet }]
  })
}
