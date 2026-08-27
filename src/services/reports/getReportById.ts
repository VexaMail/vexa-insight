import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { ReportDetailRow } from '@/types/reports'
import { and, eq, inArray } from 'drizzle-orm'

import { attachRelatedDomains } from './mappers/attachRelatedDomains'

/**
 * Returns a single raw report by id, or null if not found.
 * Includes related domains attached via normalized events.
 */
export async function getReportById(
  reportId: number,
): Promise<ReportDetailRow | null> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return null

  const query = db
    .selectDistinct({
      id: rawReports.id,
      reportId: rawReports.reportId,
      orgName: rawReports.orgName,
      beginDate: rawReports.beginDate,
      endDate: rawReports.endDate,
      sourceEmail: rawReports.sourceEmail,
      ingestedAt: rawReports.ingestedAt,
      rawXml: rawReports.rawXml,
    })
    .from(rawReports)

  if (allowedIds !== null) {
    query.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
    query.where(
      and(
        eq(rawReports.id, reportId),
        inArray(normalizedEvents.domainId, allowedIds),
      ),
    )
  } else {
    query.where(eq(rawReports.id, reportId))
  }

  const rows = await query.limit(1)
  const row = rows[0]
  if (!row) return null

  const [enriched] = await attachRelatedDomains([row])
  return (enriched as ReportDetailRow) ?? null
}
