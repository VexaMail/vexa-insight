import { getDb, jobRuns } from '@/lib/db'
import { eq } from 'drizzle-orm'

/** When a job run finished, unix ms; null while running or unknown. */
export async function queryRunCompletedAtMs(
  runId: number | null,
): Promise<number | null> {
  if (runId === null) return null
  const [row] = await getDb()
    .select({ completedAt: jobRuns.completedAt })
    .from(jobRuns)
    .where(eq(jobRuns.id, runId))
  return row?.completedAt ? row.completedAt.getTime() : null
}
