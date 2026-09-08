import type { getDb } from '@/lib/db'
import { jobRuns } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { IngestJobTotals } from './IngestJobTotals'

/** Closes the `job_runs` row. A failure here must not mask the ingest error. */
export async function finalizeJobRun(
  db: ReturnType<typeof getDb>,
  jobRunId: number | undefined,
  totals: IngestJobTotals,
): Promise<void> {
  if (jobRunId === undefined) return

  try {
    await db
      .update(jobRuns)
      .set({
        success: totals.errors.length === 0,
        processed: totals.processed,
        ingested: totals.ingested,
        errorCount: totals.errors.length,
        completedAt: new Date(),
      })
      .where(eq(jobRuns.id, jobRunId))
  } catch (updateErr) {
    console.error('[ingest] failed to update job run:', updateErr)
  }
}
