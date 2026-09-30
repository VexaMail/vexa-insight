import { getDb, normalizedEvents } from '@/lib/db'
import { DAY_SECONDS } from '@/utils/dates'
import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

/** Distinct UTC days on which the matching reports began. */
export async function countReportDays(
  whereClause: SQL | undefined,
): Promise<number> {
  const [row] = await getDb()
    .select({
      days: sql<number>`count(distinct ${normalizedEvents.reportBeginDate} / ${DAY_SECONDS})`,
    })
    .from(normalizedEvents)
    .where(whereClause)
  return row?.days ?? 0
}
