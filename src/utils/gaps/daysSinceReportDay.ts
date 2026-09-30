import { DAY_SECONDS } from '@/utils/dates'

/**
 * Whole UTC days between a rollup day index (`floor(unix / 86400)`) and now.
 */
export function daysSinceReportDay(reportDay: number, nowMs: number): number {
  return Math.floor(nowMs / 1000 / DAY_SECONDS) - reportDay
}
