import { domains, getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { PaginatedReports } from '@/types/reports'
import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { attachRelatedDomains } from './mappers/attachRelatedDomains'

/**
 * Returns paginated raw reports (list view: no rawXml).
 */
export async function getReports(
  page: number,
  pageSize: number,
  org?: string,
  domain?: string,
): Promise<PaginatedReports> {
  const db = getDb()
  const offset = (page - 1) * pageSize

  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) {
    return { items: [], total: 0, page, pageSize }
  }

  let domainFilterId: number | undefined
  if (domain) {
    const found = await db
      .select({ id: domains.id })
      .from(domains)
      .where(eq(domains.name, domain))
      .limit(1)
    if (!found[0]) return { items: [], total: 0, page, pageSize }
    domainFilterId = found[0].id
  }

  const countQuery = db
    .select({ count: sql<number>`count(distinct ${rawReports.id})` })
    .from(rawReports)
  const itemsQuery = db
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

  const needsEventsJoin = allowedIds !== null || domainFilterId !== undefined
  if (needsEventsJoin) {
    countQuery.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
    itemsQuery.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
  }

  const conditions = []
  if (allowedIds !== null) {
    conditions.push(inArray(normalizedEvents.domainId, allowedIds))
  }
  if (domainFilterId !== undefined) {
    conditions.push(eq(normalizedEvents.domainId, domainFilterId))
  }
  if (org) {
    conditions.push(eq(rawReports.orgName, org))
  }
  if (conditions.length > 0) {
    countQuery.where(and(...conditions))
    itemsQuery.where(and(...conditions))
  }

  const [countResult] = await countQuery
  const total = countResult?.count ?? 0

  let items = await itemsQuery
    .orderBy(desc(rawReports.ingestedAt))
    .limit(pageSize)
    .offset(offset)

  items = await attachRelatedDomains(items)

  return { items, total, page, pageSize }
}
