import { getDb, jobRuns } from '@/lib/db'
import type { JobRunRow } from '@/types/jobs'
import { desc } from 'drizzle-orm'

import { DEFAULT_LIMIT } from './defaultLimit'
import { getPollStatusFromDb } from './getPollStatusFromDb'

export async function getJobRunHistory(
  limit: number = DEFAULT_LIMIT,
): Promise<JobRunRow[]> {
  const db = getDb()
  const rows = await db
    .select()
    .from(jobRuns)
    .orderBy(desc(jobRuns.runAt))
    .limit(Math.min(100, Math.max(1, limit)))

  const status = await getPollStatusFromDb()

  return rows.map((r) => {
    // If it never completed and is not currently running, it stalled/crashed.
    const isStalled =
      r.success && r.completedAt === null && r.id !== status.activeJobRunId

    return {
      id: r.id,
      runAt: r.runAt,
      success: isStalled ? false : r.success,
      processed: r.processed,
      ingested: r.ingested,
      errorCount: isStalled ? r.errorCount + 1 : r.errorCount,
    }
  })
}
