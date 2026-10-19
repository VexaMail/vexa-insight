import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type {
  GetReportsInDateRangeParams,
  PaginatedReports,
} from '@/types/reports'
import { and, desc, eq } from 'drizzle-orm'
import { countDistinctReports } from './countDistinctReports'
import { latestReportsConditions } from './latestReportsConditions'
import { attachDmarcOutcome } from './mappers/attachDmarcOutcome'
import { attachRelatedDomains } from './mappers/attachRelatedDomains'
import { needsEventsJoin } from './needsEventsJoin'
import { reportListSelection } from './reportListSelection'
import { resolveDomainIdByName } from './resolveDomainIdByName'

/**
 * Returns one page of the reports list under a date range, with the total
 * counted over the same conditions (list view: no rawXml).
 */
export async function getReportsInDateRange({
  page,
  pageSize,
  from,
  to,
  org,
  domain,
}: GetReportsInDateRangeParams): Promise<PaginatedReports> {
  const empty = { items: [], total: 0, page, pageSize }

  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return empty

  const domainId = domain ? await resolveDomainIdByName(domain) : undefined
  if (domainId === null) return empty

  const db = getDb()
  const countQuery = db.select({ count: countDistinctReports }).from(rawReports)
  const itemsQuery = db.selectDistinct(reportListSelection).from(rawReports)

  const filter = { allowedIds, from, to, org, domainId }
  if (needsEventsJoin(filter)) {
    const on = eq(rawReports.id, normalizedEvents.rawReportId)
    countQuery.innerJoin(normalizedEvents, on)
    itemsQuery.innerJoin(normalizedEvents, on)
  }

  const conditions = latestReportsConditions(filter)
  if (conditions.length > 0) {
    countQuery.where(and(...conditions))
    itemsQuery.where(and(...conditions))
  }

  const [countResult] = await countQuery
  // `ingestedAt` has one-second resolution, so the id breaks ties and keeps
  // a report from appearing on two pages.
  const items = await itemsQuery
    .orderBy(desc(rawReports.ingestedAt), desc(rawReports.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  return {
    items: await attachDmarcOutcome(await attachRelatedDomains(items)),
    total: countResult?.count ?? 0,
    page,
    pageSize,
  }
}
