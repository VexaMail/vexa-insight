import { REPORT_COVERAGE_CRON } from '@/constants/gaps'
import { SNDS_SYNC_CRON } from '@/constants/snds'
import { getConfig } from '@/services/config'
import { runScheduledCoverageCheck } from '@/services/gaps'
import { hasConfiguredImapAccount } from '@/utils/imap'
import cron from 'node-cron'
import { getPollStatus } from './getPollStatus'
import { processIpHostnameLookupJob } from './processIpHostnameLookupJob'
import { checkAndRecoverStuckJob } from './recoverStuckJob'
import { runIngestJob } from './runIngestJob'
import { runScheduledSndsSync } from './runScheduledSndsSync'

/**
 * Starts the in-Node scheduler: runs IMAP fetch+ingest on a cron interval,
 * IP Hostname Lookup, the daily Microsoft SNDS sync and the daily check for
 * domains whose reports stopped.
 */
export function startScheduler(): void {
  const config = getConfig()

  // INGEST SCHEDULER (IMAP)
  const minutes = config.ingestionIntervalMinutes
  const hasImap = hasConfiguredImapAccount(config)

  if (minutes >= 1 && hasImap) {
    const cronExpr = `*/${String(minutes)} * * * *`
    cron.schedule(cronExpr, async () => {
      await checkAndRecoverStuckJob()
      const status = await getPollStatus()
      if (status.isRunning) {
        console.info('[scheduler] skipping scheduled run: job already running')
        return
      }
      const result = await runIngestJob()
      console.info(
        `[ingest] run: processed=${String(result.processed)} ingested=${String(result.ingested)} skipped=${String(result.skipped)} errors=${String(result.errorCount)}`,
      )
    })
  }

  // IP HOSTNAME LOOKUP SCHEDULER
  // Starts IP Hostname Lookup Scheduler (runs every 5 minutes)
  cron.schedule('*/5 * * * *', async () => {
    try {
      const result = await processIpHostnameLookupJob()
      if (result.processed > 0 || result.errors > 0) {
        console.info(
          `[ip-hostname-lookup] run: processed=${String(result.processed)} skipped=${String(result.skipped)} errors=${String(result.errors)}`,
        )
      }
    } catch (e) {
      console.error('[ip-hostname-lookup] Unhandled error in background job', e)
    }
  })

  // MICROSOFT SNDS SCHEDULER (daily; a no-op until SNDS is connected)
  cron.schedule(SNDS_SYNC_CRON, runScheduledSndsSync)

  // REPORT COVERAGE (daily; webhooks only)
  cron.schedule(REPORT_COVERAGE_CRON, runScheduledCoverageCheck)
}
