import { log } from '@/utils/log'
import { checkReportCoverage } from './checkReportCoverage'

/** Cron entry point for the daily report-coverage check; never throws. */
export async function runScheduledCoverageCheck(): Promise<void> {
  try {
    const silent = await checkReportCoverage()
    if (silent.length > 0) log.info('coverage.reports_stopped', { silent })
  } catch (err) {
    log.error('coverage.check_failed', {
      err: err instanceof Error ? err.message : String(err),
    })
  }
}
