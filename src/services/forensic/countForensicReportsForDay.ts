import { forensicReports } from '@/lib/db'
import type { ReportTransaction } from '@/types/reports'
import { DAY_SECONDS } from '@/utils/dates'
import { and, count, eq, gte, lt } from 'drizzle-orm'

/** Failure reports already stored for a domain on the UTC day of `unixSeconds`. */
export function countForensicReportsForDay(
  tx: ReportTransaction,
  domain: string,
  unixSeconds: number,
): number {
  const dayStart = unixSeconds - (unixSeconds % DAY_SECONDS)
  const row = tx
    .select({ n: count() })
    .from(forensicReports)
    .where(
      and(
        eq(forensicReports.reportedDomain, domain),
        gte(forensicReports.arrivalDate, dayStart),
        lt(forensicReports.arrivalDate, dayStart + DAY_SECONDS),
      ),
    )
    .get()
  return row?.n ?? 0
}
