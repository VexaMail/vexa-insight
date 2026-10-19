import { DAY_SECONDS } from '@/utils/dates'

/** UTC day index of a date, the same bucket the daily rollup uses. */
export function unixDay(date: Date): number {
  return Math.floor(date.getTime() / 1000 / DAY_SECONDS)
}
