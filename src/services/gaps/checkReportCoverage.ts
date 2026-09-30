import { REPORT_STALE_DAYS } from '@/constants/gaps'
import { fireAndForgetDispatch } from '@/services/notifications'
import { DAY_SECONDS } from '@/utils/dates'
import { daysSinceReportDay } from '@/utils/gaps'
import { getLastReportDays } from './getLastReportDays'

/**
 * Dispatches `reports.stopped` for each domain whose last report is exactly
 * one day past the stale threshold. Run once a day, so each silence is
 * announced once rather than every day it lasts. Returns the domains notified.
 */
export async function checkReportCoverage(
  nowMs = Date.now(),
): Promise<string[]> {
  const rows = await getLastReportDays()
  const silent = rows.filter(
    (row) =>
      row.lastReportDay !== null &&
      daysSinceReportDay(row.lastReportDay, nowMs) === REPORT_STALE_DAYS + 1,
  )
  for (const row of silent) {
    fireAndForgetDispatch('reports.stopped', {
      domain: row.domainName,
      lastReportDate: new Date((row.lastReportDay ?? 0) * DAY_SECONDS * 1000)
        .toISOString()
        .slice(0, 10),
      silentDays: REPORT_STALE_DAYS + 1,
    })
  }
  return silent.map((row) => row.domainName)
}
