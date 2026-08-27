import { getDb, jobRuns, pollStatus } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { ROW_ID } from './rowId'
import { STUCK_TIMEOUT_MS } from './stuckTimeoutMs' // 5 minutes

export async function checkAndRecoverStuckJob(): Promise<boolean> {
  const db = getDb()
  const row = await db
    .select()
    .from(pollStatus)
    .where(eq(pollStatus.id, ROW_ID))
    .limit(1)
    .then((rows) => rows[0])

  if (!row || !row.isRunning || !row.lastCheck) {
    return false
  }

  const now = Date.now()
  const lastUpdate = row.lastCheck.getTime()

  if (now - lastUpdate > STUCK_TIMEOUT_MS) {
    await db.update(pollStatus).set({
      isRunning: false,
      lastCheck: new Date(),
      abortRequested: false,
      processingEmails: 0,
      etaMs: 0,
      activeJobRunId: null,
    })

    if (row.activeJobRunId) {
      await db
        .update(jobRuns)
        .set({
          success: false,
          errorCount: 1,
          completedAt: new Date(),
        })
        .where(eq(jobRuns.id, row.activeJobRunId))
    }
    return true
  }

  return false
}
