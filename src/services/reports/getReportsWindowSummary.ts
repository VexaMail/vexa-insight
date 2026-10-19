import { EMPTY_REPORTS_WINDOW_SUMMARY as EMPTY } from '@/constants/reports'
import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { ReportsWindowFilter, ReportsWindowSummary } from '@/types/reports'
import { and, eq, sql } from 'drizzle-orm'
import { latestReportsConditions } from './latestReportsConditions'
import { reportsWindowSelection } from './reportsWindowSelection'
import { resolveDomainIdByName } from './resolveDomainIdByName'

/**
 * Report, reporter, domain and message totals under the same conditions as
 * the reports list, for the KPI strip above it.
 */
export async function getReportsWindowSummary(
  filter: ReportsWindowFilter,
): Promise<ReportsWindowSummary> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return EMPTY

  const domainId = filter.domain
    ? await resolveDomainIdByName(filter.domain)
    : undefined
  if (domainId === null) return EMPTY

  const conditions = latestReportsConditions({
    allowedIds,
    from: filter.from,
    to: filter.to,
    org: filter.org,
    domainId,
  })
  const [row] = await getDb()
    .select(reportsWindowSelection)
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(rawReports.id, normalizedEvents.rawReportId))
    .where(conditions.length > 0 ? and(...conditions) : sql`1 = 1`)

  return row ?? EMPTY
}
