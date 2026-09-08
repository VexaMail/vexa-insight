import { getDb, normalizedEvents } from '@/lib/db'
import { and, inArray, sql } from 'drizzle-orm'
import { getDateRangeConditions } from '../formatters/dateRangeConditions'

/** Distinct reports behind the visible events of the range. */
export async function queryScopedReportCount(
  allowedIds: number[] | null,
  from?: Date,
  to?: Date,
): Promise<number> {
  const conditions = [
    ...(allowedIds !== null
      ? [inArray(normalizedEvents.domainId, allowedIds)]
      : []),
    ...getDateRangeConditions(from, to),
  ]
  const [row] = await getDb()
    .select({
      count: sql<number>`count(distinct ${normalizedEvents.rawReportId})`,
    })
    .from(normalizedEvents)
    .where(and(...conditions))

  return row?.count ?? 0
}
