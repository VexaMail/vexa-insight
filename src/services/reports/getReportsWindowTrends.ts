import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { ReportsWindowFilter, ReportsWindowTrends } from '@/types/reports'
import { DAY_SECONDS } from '@/utils/dates'
import { buildReportsWindowTrends } from '@/utils/reports'
import { asc, eq, sql } from 'drizzle-orm'
import { reportsWindowSelection } from './reportsWindowSelection'
import { reportsWindowWhere } from './reportsWindowWhere'

/**
 * The reports-window totals per UTC day of the period end, under the same
 * filters as the list, as the sparklines of its KPI strip.
 */
export async function getReportsWindowTrends(
  filter: ReportsWindowFilter,
  now: Date = new Date(),
): Promise<ReportsWindowTrends> {
  const where = await reportsWindowWhere(filter)
  if (where === null) return buildReportsWindowTrends([], 0, 0)

  const day = sql<number>`cast(${normalizedEvents.reportEndDate} / ${DAY_SECONDS} as integer)`
  const rows = await getDb()
    .select({ day, ...reportsWindowSelection })
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(rawReports.id, normalizedEvents.rawReportId))
    .where(where)
    .groupBy(day)
    .orderBy(asc(day))

  const toDay = Math.floor((filter.to ?? now).getTime() / 1000 / DAY_SECONDS)
  const fromDay = filter.from
    ? Math.floor(filter.from.getTime() / 1000 / DAY_SECONDS)
    : (rows[0]?.day ?? toDay)
  return buildReportsWindowTrends(rows, fromDay, toDay)
}
