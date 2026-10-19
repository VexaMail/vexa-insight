import { domains, eventRollupDaily, getDb } from '@/lib/db'
import type { TriageWindow } from '@/types/dashboard'
import { and, eq, gte, lte, sql } from 'drizzle-orm'
import { domainScope } from './domainScope'

/**
 * Every visible domain with its rolled-up totals in the current and the
 * previous period: one GROUP BY over event_rollup_daily, split by day.
 */
export async function queryDomainPeriodTotals(
  window: TriageWindow,
  allowedIds: number[] | null,
) {
  const r = eventRollupDaily
  const cur = window.current.fromDay
  const minDay = window.previous?.fromDay ?? cur
  const inCurrent = sql`${r.day} >= ${cur}`
  return getDb()
    .select({
      domainId: domains.id,
      domainName: domains.name,
      createdAt: domains.createdAt,
      currentTotal: sql<number>`coalesce(sum(case when ${inCurrent} then ${r.totalCount} end), 0)`,
      currentPassed: sql<number>`coalesce(sum(case when ${inCurrent} then ${r.passedCount} end), 0)`,
      previousTotal: sql<number>`coalesce(sum(case when not ${inCurrent} then ${r.totalCount} end), 0)`,
      previousPassed: sql<number>`coalesce(sum(case when not ${inCurrent} then ${r.passedCount} end), 0)`,
    })
    .from(domains)
    .leftJoin(
      r,
      and(
        eq(r.domainId, domains.id),
        gte(r.day, minDay),
        lte(r.day, window.current.toDay),
      ),
    )
    .where(domainScope(domains.id, allowedIds))
    .groupBy(domains.id, domains.name, domains.createdAt)
}
