import type { PeriodTotals } from './PeriodTotals'

/** One domain's rolled-up messages on one UTC report day. */
export type DomainDailyTotals = PeriodTotals & {
  domainId: number
  day: number
}
