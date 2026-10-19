import {
  REGULAR_REPORTER_MIN_REPORTS,
  REPORT_STALE_DAYS,
} from '@/constants/gaps'

/** Whether a regular reporter has been quiet past the stale threshold. */
export function isReporterSilent(
  recentReportCount: number,
  daysSilent: number,
): boolean {
  return (
    recentReportCount >= REGULAR_REPORTER_MIN_REPORTS &&
    daysSilent > REPORT_STALE_DAYS
  )
}
