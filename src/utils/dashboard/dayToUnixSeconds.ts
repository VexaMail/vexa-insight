import { DAY_SECONDS } from '@/utils/dates'

/** Start of a UTC day index, unix seconds. */
export function dayToUnixSeconds(day: number): number {
  return day * DAY_SECONDS
}
