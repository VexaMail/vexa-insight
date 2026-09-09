import { normalizedEvents } from '@/lib/db'
import { toUnixSeconds } from '@/utils/dates'
import { and, eq, sql } from 'drizzle-orm'
import type { GetDiagnosticStatsParams } from './GetDiagnosticStatsParams'

/** The domain filter plus the optional report date bounds. */
export function buildDiagnosticStatsWhere({
  domainId,
  startDate,
  endDate,
}: GetDiagnosticStatsParams) {
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
