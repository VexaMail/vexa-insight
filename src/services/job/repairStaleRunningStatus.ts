import { getDb, pollStatus } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { PollStatusDbRow } from './PollStatusDbRow'
import type { PollStatusRow } from './PollStatusRow'
import { ROW_ID } from './rowId'

/**
 * Auto-repair: a row still "running" without a heartbeat for over two minutes
 * means the ingest job process died or froze, so the state is reset safely.
 */
export async function repairStaleRunningStatus(
  row: PollStatusDbRow,
): Promise<Pick<PollStatusRow, 'isRunning' | 'activeJobRunId'>> {
  if (row.isRunning && row.lastCheck) {
    const timeSinceLastCheck = Date.now() - row.lastCheck.getTime()
    const TWO_MINUTES_MS = 2 * 60 * 1000
    if (timeSinceLastCheck > TWO_MINUTES_MS) {
      await getDb()
        .update(pollStatus)
        .set({ isRunning: false, activeJobRunId: null, statusText: null })
        .where(eq(pollStatus.id, ROW_ID))
      return { isRunning: false, activeJobRunId: null }
    }
  }
  return { isRunning: row.isRunning, activeJobRunId: row.activeJobRunId }
}
