import { getDb, normalizedEvents } from '@/lib/db'
import type { DailyCount, DayRange } from '@/types/dashboard'
import { dayToUnixSeconds } from '@/utils/dashboard'
import { and, asc, gte, lt, sql } from 'drizzle-orm'
import { domainScope } from './domainScope'

/**
 * Distinct aggregate reports per UTC day their records end on: the same
 * count as the reports KPI, split by day.
 */
export async function queryDailyReportCounts(
  range: DayRange,
  allowedIds: number[] | null,
): Promise<DailyCount[]> {
  const e = normalizedEvents
  const day = sql<number>`cast(${e.reportEndDate} / 86400 as integer)`
  return getDb()
    .select({ day, count: sql<number>`count(distinct ${e.rawReportId})` })
    .from(e)
    .where(
      and(
        gte(e.reportEndDate, dayToUnixSeconds(range.fromDay)),
        lt(e.reportEndDate, dayToUnixSeconds(range.toDay + 1)),
        domainScope(e.domainId, allowedIds),
      ),
    )
    .groupBy(day)
    .orderBy(asc(day))
}
