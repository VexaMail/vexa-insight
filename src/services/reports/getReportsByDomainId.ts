import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { ReportRow } from '@/types/reports'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { attachRelatedDomains } from './mappers/attachRelatedDomains'

/**
 * Returns raw reports that contain events for the given domain.
 */
export async function getReportsByDomainId(
  domainId: number,
  org?: string,
): Promise<ReportRow[]> {
  const db = getDb()
  const eventRows = await db
    .selectDistinct({ rawReportId: normalizedEvents.rawReportId })
    .from(normalizedEvents)
    .where(eq(normalizedEvents.domainId, domainId))
  const ids = eventRows.map((r) => r.rawReportId)
  if (ids.length === 0) return []

  const whereClause = org
    ? and(inArray(rawReports.id, ids), eq(rawReports.orgName, org))
    : inArray(rawReports.id, ids)

  let rows = await db
    .select({
      id: rawReports.id,
      reportId: rawReports.reportId,
      orgName: rawReports.orgName,
      beginDate: rawReports.beginDate,
      endDate: rawReports.endDate,
      sourceEmail: rawReports.sourceEmail,
      ingestedAt: rawReports.ingestedAt,
    })
    .from(rawReports)
    .where(whereClause)
    .orderBy(desc(rawReports.ingestedAt))

  rows = await attachRelatedDomains(rows)
  return rows
}
