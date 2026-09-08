import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { GetLatestReportsParams, ReportRow } from '@/types/reports'
import { and, desc, eq } from 'drizzle-orm'
import { latestReportsConditions } from './latestReportsConditions'
import { attachRelatedDomains } from './mappers/attachRelatedDomains'
import { resolveDomainIdByName } from './resolveDomainIdByName'

/**
 * Returns the latest N reports (for dashboard).
 */
export async function getLatestReports({
  limit = 8,
  from,
  to,
  org,
  domain,
}: GetLatestReportsParams = {}): Promise<ReportRow[]> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  let domainId: number | undefined
  if (domain !== undefined && domain !== '') {
    const found = await resolveDomainIdByName(domain)
    if (found === null) return []
    domainId = found
  }

  const query = getDb()
    .selectDistinct({
      id: rawReports.id,
      reportId: rawReports.reportId,
      orgName: rawReports.orgName,
      beginDate: rawReports.beginDate,
      endDate: rawReports.endDate,
      sourceEmail: rawReports.sourceEmail,
      ingestedAt: rawReports.ingestedAt,
    })
    .from(rawReports)

  // Every filter but `org` reads a column of normalizedEvents, so the join is
  // needed exactly when one of them is present.
  if (allowedIds !== null || from || to || domainId !== undefined) {
    query.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
  }

  const conditions = latestReportsConditions({
    allowedIds,
    from,
    to,
    org,
    domainId,
  })
  if (conditions.length > 0) {
    query.where(and(...conditions))
  }

  const items = await query.orderBy(desc(rawReports.ingestedAt)).limit(limit)
  return attachRelatedDomains(items)
}
