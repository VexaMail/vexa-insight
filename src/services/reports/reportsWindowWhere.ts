import { getAllowedDomainIds } from '@/services/auth'
import type { ReportsWindowFilter } from '@/types/reports'
import type { SQL } from 'drizzle-orm'
import { and, sql } from 'drizzle-orm'
import { latestReportsConditions } from './latestReportsConditions'
import { resolveDomainIdByName } from './resolveDomainIdByName'

/**
 * The where clause of the reports list filters, as every reports-window
 * aggregate applies it; `null` when the viewer can see nothing under them.
 */
export async function reportsWindowWhere(
  filter: ReportsWindowFilter,
): Promise<SQL | null> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return null

  const domainId = filter.domain
    ? await resolveDomainIdByName(filter.domain)
    : undefined
  if (domainId === null) return null

  const conditions = latestReportsConditions({
    allowedIds,
    from: filter.from,
    to: filter.to,
    org: filter.org,
    domainId,
  })
  return conditions.length > 0 ? (and(...conditions) ?? sql`1 = 1`) : sql`1 = 1`
}
