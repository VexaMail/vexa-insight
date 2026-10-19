import { getConfig } from '@/services/config'
import { getJobRunHistory, getPollStatusSafe } from '@/services/job'
import type { IngestionHealth } from '@/types/dashboard'
import { buildIngestionHealth } from '@/utils/dashboard'
import { hasConfiguredImapAccount } from '@/utils/imap'

/** Scheduler, latest run and last success, read from the existing tables. */
export async function getIngestionHealth(
  newestReportDay: number | null,
  nowMs: number,
): Promise<IngestionHealth> {
  const config = getConfig()
  // In sequence: both read the poll_status row and create it when missing,
  // so running them together races on a fresh database.
  const status = await getPollStatusSafe()
  const runs = await getJobRunHistory(1)
  return buildIngestionHealth({
    intervalMinutes: config.ingestionIntervalMinutes,
    hasImapAccount: hasConfiguredImapAccount(config),
    isRunning: status.isRunning,
    latestRun: runs[0] ?? null,
    lastSuccessAtMs: status.lastCheck
      ? new Date(status.lastCheck).getTime()
      : null,
    newestReportDay,
    nowMs,
  })
}
