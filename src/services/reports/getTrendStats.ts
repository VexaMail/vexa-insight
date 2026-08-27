import { getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { TrendDataPoint } from '@/types/reports'
import { and, inArray, sql } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'

/**
 * Returns pass/fail trend time series. Buckets by day or week.
 * period: 'hour' | 'day' | 'week', days: last N days to include.
 */
export async function getTrendStats(
  period: 'hour' | 'day' | 'week',
  from?: Date,
  to?: Date,
): Promise<TrendDataPoint[]> {
  const db = getDb()

  let dateExpr = sql<string>`date(${normalizedEvents.reportEndDate}, 'unixepoch')`
  if (period === 'hour') {
    dateExpr = sql<string>`strftime('%Y-%m-%d %H:00:00', ${normalizedEvents.reportEndDate}, 'unixepoch')`
  } else if (period === 'week') {
    dateExpr = sql<string>`strftime('%Y-%W', ${normalizedEvents.reportEndDate}, 'unixepoch')`
  }

  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const query = db
    .select({
      date: dateExpr,
      passed: sql<number>`sum(case when ${normalizedEvents.spfResult} = 'pass' or ${normalizedEvents.dkimResult} = 'pass' then ${normalizedEvents.count} else 0 end)`,
      failed: sql<number>`sum(case when not (${normalizedEvents.spfResult} = 'pass' or ${normalizedEvents.dkimResult} = 'pass') then ${normalizedEvents.count} else 0 end)`,
    })
    .from(normalizedEvents)

  const conditions = [...getDateRangeConditions(from, to)]
  if (allowedIds !== null) {
    conditions.push(inArray(normalizedEvents.domainId, allowedIds))
  }

  const rows = await query
    .where(and(...conditions))
    .groupBy(dateExpr)
    .orderBy(dateExpr)
  return rows.map((r) => ({
    date: r.date,
    passed: r.passed,
    failed: r.failed,
  }))
}
