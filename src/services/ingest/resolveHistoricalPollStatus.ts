import { getPollStatus } from '@/services/job'
import type { PollStatus } from '@/types/dashboard'
import type { JobRunRow } from '@/types/jobs'

/**
 * Poll status as it should be displayed for a finished run: its own progress
 * rows if they still exist, with the totals of the run itself.
 */
export async function resolveHistoricalPollStatus(
  run: JobRunRow,
): Promise<PollStatus> {
  const historical = await getPollStatus(1, 50, run.id)

  return {
    ...historical,
    isRunning: false,
    lastCheck: run.runAt.toISOString(),
    currentProcessed: run.processed,
    totalEmails: run.processed,
    processingEmails: 0,
    etaMs: 0,
  }
}
