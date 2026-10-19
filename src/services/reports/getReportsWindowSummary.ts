import { EMPTY_REPORTS_WINDOW_SUMMARY as EMPTY } from '@/constants/reports'
import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { ReportsWindowFilter, ReportsWindowSummary } from '@/types/reports'
import { eq } from 'drizzle-orm'
import { reportsWindowSelection } from './reportsWindowSelection'
import { reportsWindowWhere } from './reportsWindowWhere'

/**
 * Report, reporter, domain and message totals under the same conditions as
 * the reports list, for the KPI strip above it.
 */
export async function getReportsWindowSummary(
  filter: ReportsWindowFilter,
): Promise<ReportsWindowSummary> {
  const where = await reportsWindowWhere(filter)
  if (where === null) return EMPTY

  const [row] = await getDb()
    .select(reportsWindowSelection)
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(rawReports.id, normalizedEvents.rawReportId))
    .where(where)

  return row ?? EMPTY
}
