import type { DayRange } from './DayRange'

/**
 * The period the overview reports on and the period of the same length right
 * before it, both in whole UTC report days. `previous` is null for the
 * all-time range, which has nothing before it to compare with.
 */
export type TriageWindow = {
  current: DayRange
  previous: DayRange | null
  lengthDays: number
  /** Human label of the current period, e.g. "last 30 days". */
  label: string
}
