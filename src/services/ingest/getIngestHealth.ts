import { getConfig } from '@/services/config'
import { checkIngestFreshness } from '@/services/health'
import type { IngestHealth } from '@/types/ingest'
import { computeNextScheduledRun } from '@/utils/ingest'
import { queryMailboxHealth } from './queryMailboxHealth'
import { queryReportFreshness } from './queryReportFreshness'
import { queryRunHealth } from './queryRunHealth'

/**
 * Scheduler, mailboxes, processing and data freshness read separately, so
 * an idle engine with a broken mailbox or stale data cannot pass as healthy.
 */
export async function getIngestHealth(
  isRunning: boolean,
  now: Date = new Date(),
): Promise<IngestHealth> {
  const intervalMinutes = getConfig().ingestionIntervalMinutes
  const [scheduler, runs, mailboxes, reports] = await Promise.all([
    checkIngestFreshness(now),
    queryRunHealth(now),
    queryMailboxHealth(),
    queryReportFreshness(),
  ])

  return {
    now,
    intervalMinutes,
    scheduler,
    nextRunAt:
      scheduler === 'idle'
        ? null
        : computeNextScheduledRun(now, intervalMinutes),
    isRunning,
    runs,
    mailboxes,
    reports,
  }
}
