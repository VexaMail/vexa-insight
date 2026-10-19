import type { PeriodTotals } from './PeriodTotals'

/** Rolled-up messages of one UTC report day across the visible domains. */
export type DailyPassTotals = PeriodTotals & {
  day: number
}
