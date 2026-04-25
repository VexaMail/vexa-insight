import { domains, getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { ReportRow } from '@/types/reports'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'
import { attachRelatedDomains } from './mappers/attachRelatedDomains'

/**
 * Returns the latest N reports (for dashboard).
 */
export async function getLatestReports(
  limit = 8,
  from?: Date,
  to?: Date,
  org?: string,
  domain?: string,
): Promise<ReportRow[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  let domainFilterId: number | undefined
  if (domain) {
    const found = await db
      .select({ id: domains.id })
      .from(domains)
      .where(eq(domains.name, domain))
      .limit(1)
    if (!found[0]) return []
    domainFilterId = found[0].id
  }

  const query = db
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

  const conditions = []
  let hasJoinedNormalizedEvents = false

  if (allowedIds !== null) {
    query.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
    hasJoinedNormalizedEvents = true
    conditions.push(inArray(normalizedEvents.domainId, allowedIds))
  }

  if (from || to) {
    if (!hasJoinedNormalizedEvents) {
      query.innerJoin(
        normalizedEvents,
        eq(rawReports.id, normalizedEvents.rawReportId),
      )
      hasJoinedNormalizedEvents = true
    }
    conditions.push(...getDateRangeConditions(from, to))
  }

  if (domainFilterId !== undefined) {
    if (!hasJoinedNormalizedEvents) {
      query.innerJoin(
        normalizedEvents,
        eq(rawReports.id, normalizedEvents.rawReportId),
      )
    }
    conditions.push(eq(normalizedEvents.domainId, domainFilterId))
  }

  if (org) {
    conditions.push(eq(rawReports.orgName, org))
  }

  if (conditions.length > 0) {
    query.where(and(...conditions))
  }

  let items = await query.orderBy(desc(rawReports.ingestedAt)).limit(limit)
  items = await attachRelatedDomains(items)
  return items
}
