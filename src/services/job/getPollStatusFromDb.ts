import { getDb, pollStatus } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { EMPTY_POLL_STATUS_ROW } from './emptyPollStatusRow'
import { getLastSuccessfulRunAt } from './getLastSuccessfulRunAt'
import type { PollStatusRow } from './PollStatusRow'
import { repairStaleRunningStatus } from './repairStaleRunningStatus'
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

  const derivedLastCheck =
    (await getLastSuccessfulRunAt()) ?? row?.lastCheck ?? null

  if (row) {
    const { isRunning, activeJobRunId } = await repairStaleRunningStatus(row)
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

  await db.insert(pollStatus).values({ id: ROW_ID, ...EMPTY_POLL_STATUS_ROW })
  return { ...EMPTY_POLL_STATUS_ROW, lastCheck: derivedLastCheck }
}
