import type { ReportEndRow, ReporterCoverage } from '@/types/gaps'
import { DAY_SECONDS } from '@/utils/dates'
import { isReporterSilent } from './isReporterSilent'

/** Per-receiver coverage from one row per report, newest receiver first. */
export function summarizeReporterCoverage(
  reports: readonly ReportEndRow[],
  nowSeconds: number,
): ReporterCoverage[] {
  const byOrg = new Map<string, number[]>()
  for (const report of reports) {
    byOrg.set(report.orgName, [
      ...(byOrg.get(report.orgName) ?? []),
      report.endDate,
    ])
  }
  return [...byOrg]
    .map(([orgName, ends]) => {
      const lastReportEnd = Math.max(...ends)
      const recentReportCount = ends.filter(
        (end) => end > lastReportEnd - 30 * DAY_SECONDS,
      ).length
      const daysSilent = Math.max(
        0,
        Math.floor((nowSeconds - lastReportEnd) / DAY_SECONDS),
      )
      return {
        orgName,
        lastReportEnd,
        reportCount: ends.length,
        recentReportCount,
        daysSilent,
        silent: isReporterSilent(recentReportCount, daysSilent),
      }
    })
    .sort((a, b) => b.lastReportEnd - a.lastReportEnd)
}
