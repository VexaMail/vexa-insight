import { eventRollupDaily, getDb } from '@/lib/db'
import type { RollupSums } from '@/types/reports'
import { and, inArray, sql } from 'drizzle-orm'
import { getRollupDayConditions } from '../formatters/rollupDayConditions'

/**
 * Email totals from event_rollup_daily (a few rows per domain per day) rather
 * than a SUM over the unbounded normalized_events table.
 */
export async function queryRollupSums(
  allowedIds: number[] | null,
  from?: Date,
  to?: Date,
): Promise<RollupSums> {
  const conditions = [
    ...(allowedIds !== null
      ? [inArray(eventRollupDaily.domainId, allowedIds)]
      : []),
    ...getRollupDayConditions(from, to),
  ]
  const [row] = await getDb()
    .select({
      total: sql<number>`coalesce(sum(${eventRollupDaily.totalCount}), 0)`,
      passed: sql<number>`coalesce(sum(${eventRollupDaily.passedCount}), 0)`,
    })
    .from(eventRollupDaily)
    .where(and(...conditions))

  return { total: row?.total ?? 0, passed: row?.passed ?? 0 }
}
