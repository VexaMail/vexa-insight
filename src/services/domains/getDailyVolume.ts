import { eventRollupDaily, getDb } from '@/lib/db'
import { DAY_SECONDS } from '@/utils/dates'
import { toDailySeries } from '@/utils/domains'
import { and, asc, gte, inArray, lte, sql } from 'drizzle-orm'

/**
 * Reported messages per UTC day over the last `days` days for the given
 * domains, oldest first, with empty days as zero. Read from the daily rollup.
 */
export async function getDailyVolume(
  domainIds: readonly number[],
  days: number,
  now = new Date(),
): Promise<number[]> {
  const toDay = Math.floor(now.getTime() / 1000 / DAY_SECONDS)
  const fromDay = toDay - days + 1
  if (domainIds.length === 0) return toDailySeries([], fromDay, days)
  const r = eventRollupDaily
  const rows = await getDb()
    .select({
      day: r.day,
      total: sql<number>`sum(${r.totalCount})`.mapWith(Number),
    })
    .from(r)
    .where(
      and(
        gte(r.day, fromDay),
        lte(r.day, toDay),
        inArray(r.domainId, [...domainIds]),
      ),
    )
    .groupBy(r.day)
    .orderBy(asc(r.day))
  return toDailySeries(rows, fromDay, days)
}
