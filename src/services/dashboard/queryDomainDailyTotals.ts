import { eventRollupDaily, getDb } from '@/lib/db'
import type { DayRange, DomainDailyTotals } from '@/types/dashboard'
import { and, asc, gte, lte } from 'drizzle-orm'
import { domainScope } from './domainScope'

/** Rolled-up totals per visible domain and UTC report day, oldest first. */
export async function queryDomainDailyTotals(
  range: DayRange,
  allowedIds: number[] | null,
): Promise<DomainDailyTotals[]> {
  const r = eventRollupDaily
  return getDb()
    .select({
      domainId: r.domainId,
      day: r.day,
      total: r.totalCount,
      passed: r.passedCount,
    })
    .from(r)
    .where(
      and(
        gte(r.day, range.fromDay),
        lte(r.day, range.toDay),
        domainScope(r.domainId, allowedIds),
      ),
    )
    .orderBy(asc(r.day))
}
