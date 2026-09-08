import type { getDb } from '@/lib/db'
import { jobRuns } from '@/lib/db'

/** Opens the `job_runs` row for this ingest and returns its id. */
export async function startJobRun(
  db: ReturnType<typeof getDb>,
): Promise<number | undefined> {
  const insertedRows = await db
    .insert(jobRuns)
    .values({
      runAt: new Date(),
      success: true,
      processed: 0,
      ingested: 0,
      errorCount: 0,
    })
    .returning({ id: jobRuns.id })

  return insertedRows[0]?.id
}
