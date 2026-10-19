import { isReportCoverageStale } from '@/utils/gaps'

/** Whether a domain has had no report for too long, as of now. */
export function isLastReportStale(
  lastReportDay: number | null | undefined,
): boolean {
  return isReportCoverageStale(lastReportDay, Date.now())
}
