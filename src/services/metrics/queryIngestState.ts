import { getDb, jobRuns, pollStatus } from '@/lib/db'
import type { MetricsIngestState } from '@/types/metrics'
import { desc, eq } from 'drizzle-orm'

/** Ingestion state: the poll row plus the counters of the last job run. */
export function queryIngestState(): MetricsIngestState {
  const db = getDb()
  const poll = db
    .select({
      isRunning: pollStatus.isRunning,
      lastCheck: pollStatus.lastCheck,
    })
    .from(pollStatus)
    .where(eq(pollStatus.id, 1))
    .get()
  const lastRun = db
    .select({ processed: jobRuns.processed, errorCount: jobRuns.errorCount })
    .from(jobRuns)
    .orderBy(desc(jobRuns.runAt))
    .limit(1)
    .get()

  return {
    ingestLastRunTimestampSeconds: poll?.lastCheck
      ? Math.floor(poll.lastCheck.getTime() / 1000)
      : null,
    ingestIsRunning: poll?.isRunning ? 1 : 0,
    ingestLastSuccessTotal: lastRun?.processed ?? 0,
    ingestLastErrorCount: lastRun?.errorCount ?? 0,
  }
}
