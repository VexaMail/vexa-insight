import { ALERT_EVALUATION_CRON } from '@/constants/alerts'
import { DIAGNOSTICS_CHECK_CRON } from '@/constants/diagnostics'
import { DNS_SNAPSHOT_CRON } from '@/constants/dns-history'
import { REPORT_COVERAGE_CRON } from '@/constants/gaps'
import { RETENTION_PRUNE_CRON } from '@/constants/retention'
import { SNDS_SYNC_CRON } from '@/constants/snds'
import { runScheduledAlertEvaluation } from '@/services/alerts'
import { getConfig } from '@/services/config'
import { runScheduledDiagnosticsCheck } from '@/services/diagnostics'
import { runScheduledDnsSnapshot } from '@/services/dns-history'
import { runScheduledCoverageCheck } from '@/services/gaps'
import { runScheduledPrune } from '@/services/retention'
import { hasConfiguredImapAccount } from '@/utils/imap'
import { log } from '@/utils/log'
import cron from 'node-cron'
import { getPollStatus } from './getPollStatus'
import { processIpHostnameLookupJob } from './processIpHostnameLookupJob'
import { checkAndRecoverStuckJob } from './recoverStuckJob'
import { runIngestJob } from './runIngestJob'
import { runScheduledSndsSync } from './runScheduledSndsSync'

/**
 * Starts the in-Node scheduler: runs IMAP fetch+ingest on a cron interval,
 * IP Hostname Lookup, the daily Microsoft SNDS sync, the daily check for
 * domains whose reports stopped, the daily DNS snapshot, the daily diagnostics check and alert rules, and the daily prune of tables that only grow.
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
      log.info(
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
        log.info(
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

  // ALERT RULES (daily; webhooks only)
  cron.schedule(ALERT_EVALUATION_CRON, runScheduledAlertEvaluation)

  // DNS HISTORY (daily; stores changed records, webhooks on change)
  cron.schedule(DNS_SNAPSHOT_CRON, runScheduledDnsSnapshot)

  // DIAGNOSTICS INDEX (daily; stores each domain's score and protocol states)
  cron.schedule(DIAGNOSTICS_CHECK_CRON, runScheduledDiagnosticsCheck)

  // RETENTION (daily; expired sessions, poll events past 90 days)
  cron.schedule(RETENTION_PRUNE_CRON, runScheduledPrune)
}
