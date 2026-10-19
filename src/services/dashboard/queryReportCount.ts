import { getDb, normalizedEvents } from '@/lib/db'
import type { DayRange } from '@/types/dashboard'
import { dayToUnixSeconds } from '@/utils/dashboard'
import { and, gte, lt, sql } from 'drizzle-orm'
import { domainScope } from './domainScope'

/** Distinct aggregate reports with records ending inside the days. */
export async function queryReportCount(
  range: DayRange,
  allowedIds: number[] | null,
): Promise<number> {
  const e = normalizedEvents
  const [row] = await getDb()
    .select({ count: sql<number>`count(distinct ${e.rawReportId})` })
    .from(e)
    .where(
      and(
        gte(e.reportEndDate, dayToUnixSeconds(range.fromDay)),
        lt(e.reportEndDate, dayToUnixSeconds(range.toDay + 1)),
        domainScope(e.domainId, allowedIds),
      ),
    )
  return row?.count ?? 0
}
