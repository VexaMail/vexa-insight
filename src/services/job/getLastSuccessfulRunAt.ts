import { getDb, jobRuns } from '@/lib/db'
import { desc, eq } from 'drizzle-orm'

/** When the most recent successful ingest run started, if any. */
export async function getLastSuccessfulRunAt(): Promise<Date | null> {
  const rows = await getDb()
    .select({ runAt: jobRuns.runAt })
    .from(jobRuns)
    .where(eq(jobRuns.success, true))
    .orderBy(desc(jobRuns.runAt))
    .limit(1)
  return rows[0]?.runAt ?? null
}
