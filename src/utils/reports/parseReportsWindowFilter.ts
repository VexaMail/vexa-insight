import { parseDateRangeParams } from '@/lib/utils'
import type { ReportsWindowFilter } from '@/types/reports'
import { fromDateForDaysParam } from '@/utils/dates'

/**
 * The reports page's URL filters, read the way the list API reads them: an
 * explicit from/to wins, otherwise the window is the last `days` days.
 */
export function parseReportsWindowFilter(
  params: Record<string, string | string[] | undefined>,
): ReportsWindowFilter {
  const { days, fromDate, toDate } = parseDateRangeParams(params)
  const org = typeof params['org'] === 'string' ? params['org'] : undefined
  const domain =
    typeof params['domain'] === 'string' ? params['domain'] : undefined
  const hasRange = fromDate !== undefined || toDate !== undefined

  return {
    from: hasRange ? fromDate : fromDateForDaysParam(String(days)),
    to: toDate,
    org: org || undefined,
    domain: domain || undefined,
  }
}
