import { getConfig } from '@/services/config'
import cron from 'node-cron'
import { getPollStatus } from './getPollStatus'
import { processIpHostnameLookupJob } from './processIpHostnameLookupJob'
import { checkAndRecoverStuckJob } from './recoverStuckJob'
import { runIngestJob } from './runIngestJob'

/**
 * Starts the in-Node scheduler: runs IMAP fetch+ingest on a cron interval and IP Hostname Lookup.
 */
export function startScheduler(): void {
  const config = getConfig()

  // INGEST SCHEDULER (IMAP)
  const minutes = config.ingestionIntervalMinutes
  const first = config.imapAccounts?.[0]
  const hasImap = Boolean(
    first && first.server && first.username && first.password,
  )

  if (minutes >= 1 && hasImap) {
    const cronExpr = `*/${minutes} * * * *`
    cron.schedule(cronExpr, async () => {
      await checkAndRecoverStuckJob()
      const status = await getPollStatus()
      if (status.isRunning) {
        console.info('[scheduler] skipping scheduled run: job already running')
        return
      }
      const result = await runIngestJob()
      console.info(
        `[ingest] run: processed=${result.processed} ingested=${result.ingested} skipped=${result.skipped} errors=${result.errorCount}`,
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
          `[ip-hostname-lookup] run: processed=${result.processed} skipped=${result.skipped} errors=${result.errors}`,
        )
      }
    } catch (e) {
      console.error('[ip-hostname-lookup] Unhandled error in background job', e)
    }
  })
}
