import { RECENT_RUN_LIMIT } from '@/constants/dashboard'
import { getConfig } from '@/services/config'
import { getJobRunHistory, getPollStatusSafe } from '@/services/job'
import type { IngestionHealth } from '@/types/dashboard'
import { buildIngestionHealth } from '@/utils/dashboard'
import { hasConfiguredImapAccount } from '@/utils/imap'
import { queryNewestIngestedAtMs } from './queryNewestIngestedAtMs'
import { queryRunCompletedAtMs } from './queryRunCompletedAtMs'

/** Scheduler, latest runs, last success and freshness, from existing tables. */
export async function getIngestionHealth(
  newestReportDay: number | null,
  nowMs: number,
): Promise<IngestionHealth> {
  const config = getConfig()
  // In sequence: both read the poll_status row and create it when missing,
  // so running them together races on a fresh database.
  const status = await getPollStatusSafe()
  const runs = await getJobRunHistory(RECENT_RUN_LIMIT)
  const latestRun = runs[0] ?? null
  return buildIngestionHealth({
    intervalMinutes: config.ingestionIntervalMinutes,
    hasImapAccount: hasConfiguredImapAccount(config),
    isRunning: status.isRunning,
    latestRun,
    previousRun: runs[1] ?? null,
    recentRuns: runs,
    lastRunCompletedAtMs: await queryRunCompletedAtMs(latestRun?.id ?? null),
    mailboxCount: config.imapAccounts.filter((a) => a.server && a.username)
      .length,
    newestIngestedAtMs: await queryNewestIngestedAtMs(),
    lastSuccessAtMs: status.lastCheck
      ? new Date(status.lastCheck).getTime()
      : null,
    newestReportDay,
    nowMs,
  })
}
