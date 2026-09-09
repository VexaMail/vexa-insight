import type { PaginatedProgressItems, PollStatus } from '@/types/dashboard'
import { EMPTY_POLL_STATUS_ROW } from './emptyPollStatusRow'
import type { PollStatusRow } from './PollStatusRow'

/** The API shape of the poll status; a missing row reads as idle. */
export function buildPollStatus(
  status: PollStatusRow | null,
  progressItems: PaginatedProgressItems,
): PollStatus {
  const row = status ?? EMPTY_POLL_STATUS_ROW
  return {
    isRunning: row.isRunning,
    lastCheck: row.lastCheck?.toISOString() ?? null,
    currentProcessed: row.currentProcessed,
    totalEmails: row.totalEmails,
    processingEmails: row.processingEmails,
    etaMs: row.etaMs,
    progressItems,
    activeJobRunId: row.activeJobRunId,
    statusText: row.statusText,
  }
}
