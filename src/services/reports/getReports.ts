import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { PaginatedReports } from '@/types/reports'
import { and, desc, eq } from 'drizzle-orm'
import { countDistinctReports } from './countDistinctReports'
import { attachRelatedDomains } from './mappers/attachRelatedDomains'
import { reportListSelection } from './reportListSelection'
import { reportsListConditions } from './reportsListConditions'
import { resolveDomainIdByName } from './resolveDomainIdByName'

/**
 * Returns paginated raw reports (list view: no rawXml).
 */
export async function getReports(
  page: number,
  pageSize: number,
  org?: string,
  domain?: string,
): Promise<PaginatedReports> {
  const empty = { items: [], total: 0, page, pageSize }

  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return empty

  const domainId = domain ? await resolveDomainIdByName(domain) : undefined
  if (domainId === null) return empty

  const db = getDb()
  const countQuery = db.select({ count: countDistinctReports }).from(rawReports)
  const itemsQuery = db.selectDistinct(reportListSelection).from(rawReports)

  // Every filter but `org` reads a column of normalizedEvents, so the join is
  // needed exactly when one of them is present.
  if (allowedIds !== null || domainId !== undefined) {
    const on = eq(rawReports.id, normalizedEvents.rawReportId)
    countQuery.innerJoin(normalizedEvents, on)
    itemsQuery.innerJoin(normalizedEvents, on)
  }

  const conditions = reportsListConditions({ allowedIds, domainId, org })
  if (conditions.length > 0) {
    countQuery.where(and(...conditions))
    itemsQuery.where(and(...conditions))
  }

  const [countResult] = await countQuery
  const items = await itemsQuery
    .orderBy(desc(rawReports.ingestedAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  return {
    items: await attachRelatedDomains(items),
    total: countResult?.count ?? 0,
    page,
    pageSize,
  }
}
