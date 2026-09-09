import type { PollStatus } from '@/types/dashboard'
import type { IngestState } from '@/types/IngestState'

/** Seeds the ingest store from the server-rendered poll status. */
export function buildIngestInitialState(
  displayPollStatus: PollStatus,
  effectiveJobId: number | undefined,
): Partial<IngestState> {
  return {
    selectedJobId: effectiveJobId ?? null,
    isRunning: displayPollStatus.isRunning,
    lastCheck: displayPollStatus.lastCheck,
    currentProcessed: displayPollStatus.currentProcessed,
    totalEmails: displayPollStatus.totalEmails,
    processingEmails: displayPollStatus.processingEmails,
    etaMs: displayPollStatus.etaMs,
    progressItems: displayPollStatus.progressItems.items,
    progressTotal: displayPollStatus.progressItems.total,
    pageSize: displayPollStatus.progressItems.pageSize,
    page: displayPollStatus.progressItems.page,
  }
}
