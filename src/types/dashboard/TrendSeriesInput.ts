import type { DailyCount } from './DailyCount'
import type { DayRange } from './DayRange'
import type { DomainDailyTotals } from './DomainDailyTotals'
import type { DomainPeriodTotals } from './DomainPeriodTotals'

/** What the sparkline builders read: buckets of the window and daily rows. */
export type TrendSeriesInput = {
  buckets: DayRange[]
  daily: DomainDailyTotals[]
  reports: DailyCount[]
  domains: DomainPeriodTotals[]
}
