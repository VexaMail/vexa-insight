import { EMPTY_LAST_RUN_HEALTH } from '@/constants/ingest'
import { getDb, jobRuns } from '@/lib/db'
import type { LastRunHealth } from '@/types/ingest'
import { desc } from 'drizzle-orm'

/** The newest job run, or an empty record when none has run yet. */
export async function queryLastRunHealth(): Promise<LastRunHealth> {
  const [last] = await getDb()
    .select({
      lastRunAt: jobRuns.runAt,
      lastRunSuccess: jobRuns.success,
      lastProcessed: jobRuns.processed,
      lastIngested: jobRuns.ingested,
      lastErrorCount: jobRuns.errorCount,
      lastErrorSummary: jobRuns.errorSummary,
    })
    .from(jobRuns)
    .orderBy(desc(jobRuns.runAt))
    .limit(1)
  return last ?? EMPTY_LAST_RUN_HEALTH
}
