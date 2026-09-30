import { REPORT_STALE_DAYS } from '@/constants/gaps'
import { daysSinceReportDay } from './daysSinceReportDay'

/** Whether a domain that has had reports has gone silent. */
export function isReportCoverageStale(
  lastReportDay: number | null | undefined,
  nowMs: number,
): boolean {
  if (lastReportDay == null) return false
  return daysSinceReportDay(lastReportDay, nowMs) > REPORT_STALE_DAYS
}
