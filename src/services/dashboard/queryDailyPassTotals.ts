import { eventRollupDaily, getDb } from '@/lib/db'
import type { DailyPassTotals, DayRange } from '@/types/dashboard'
import { and, asc, gte, lte, sql } from 'drizzle-orm'
import { domainScope } from './domainScope'

/** Rolled-up totals per UTC report day across the visible domains. */
export async function queryDailyPassTotals(
  range: DayRange,
  allowedIds: number[] | null,
): Promise<DailyPassTotals[]> {
  const r = eventRollupDaily
  return getDb()
    .select({
      day: r.day,
      total: sql<number>`sum(${r.totalCount})`,
      passed: sql<number>`sum(${r.passedCount})`,
    })
    .from(r)
    .where(
      and(
        gte(r.day, range.fromDay),
        lte(r.day, range.toDay),
        domainScope(r.domainId, allowedIds),
      ),
    )
    .groupBy(r.day)
    .orderBy(asc(r.day))
}
