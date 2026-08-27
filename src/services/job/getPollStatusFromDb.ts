import { getDb, jobRuns, pollStatus } from '@/lib/db'
import { desc, eq } from 'drizzle-orm'
import type { PollStatusRow } from './PollStatusRow'
import { ROW_ID } from './rowId'

/**
 * Returns the persisted poll status (isRunning, lastCheck). Ensures row exists.
 */
export async function getPollStatusFromDb(): Promise<PollStatusRow> {
  const db = getDb()
  const row = await db
    .select()
    .from(pollStatus)
    .where(eq(pollStatus.id, ROW_ID))
    .limit(1)
    .then((rows) => rows[0])

  const lastSuccess = await db
    .select({ runAt: jobRuns.runAt })
    .from(jobRuns)
    .where(eq(jobRuns.success, true))
    .orderBy(desc(jobRuns.runAt))
    .limit(1)

  const derivedLastCheck = lastSuccess[0]?.runAt ?? row?.lastCheck ?? null

  if (row) {
    let isRunning = row.isRunning
    let activeJobRunId = row.activeJobRunId

    // Auto-repair: If it's been running but we haven't seen a heartbeat in > 2 minutes,
    // consider the ingest job process dead/frozen and reset the state safely.
    if (isRunning && row.lastCheck) {
      const timeSinceLastCheck = Date.now() - row.lastCheck.getTime()
      const TWO_MINUTES_MS = 2 * 60 * 1000
      if (timeSinceLastCheck > TWO_MINUTES_MS) {
        isRunning = false
        activeJobRunId = null
        await db
          .update(pollStatus)
          .set({ isRunning: false, activeJobRunId: null, statusText: null })
          .where(eq(pollStatus.id, ROW_ID))
      }
    }

    return {
      isRunning,
      lastCheck: derivedLastCheck,
      currentProcessed: row.currentProcessed,
      totalEmails: row.totalEmails,
      processingEmails: row.processingEmails,
      etaMs: row.etaMs,
      abortRequested: row.abortRequested,
      activeJobRunId,
      statusText: row.statusText ?? null,
    }
  }

  await db.insert(pollStatus).values({
    id: ROW_ID,
    isRunning: false,
    lastCheck: null,
    currentProcessed: 0,
    totalEmails: 0,
    processingEmails: 0,
    etaMs: 0,
    abortRequested: false,
    activeJobRunId: null,
    statusText: null,
  })
  return {
    isRunning: false,
    lastCheck: derivedLastCheck,
    currentProcessed: 0,
    totalEmails: 0,
    processingEmails: 0,
    etaMs: 0,
    abortRequested: false,
    activeJobRunId: null,
    statusText: null,
  }
}
