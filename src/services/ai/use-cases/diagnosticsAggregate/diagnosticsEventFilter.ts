import { normalizedEvents } from '@/lib/db'
import { toUnixSeconds } from '@/utils/dates'
import type { SQL } from 'drizzle-orm'
import { and, eq, sql } from 'drizzle-orm'

/** Where clause selecting one domain's events inside an optional date range. */
export function diagnosticsEventFilter(
  domainId: number,
  startDate?: Date,
  endDate?: Date,
): SQL | undefined {
  const conditions = [eq(normalizedEvents.domainId, domainId)]
  if (startDate) {
    conditions.push(
      sql`${normalizedEvents.reportBeginDate} >= ${toUnixSeconds(startDate)}`,
    )
  }
  if (endDate) {
    conditions.push(
      sql`${normalizedEvents.reportEndDate} <= ${toUnixSeconds(endDate)}`,
    )
  }
  return and(...conditions)
}
