import { getDb, pollStatus } from '@/lib/db'
import type { PollStatusUpdate } from './PollStatusUpdate'

/**
 * Updates the persisted poll status in a single UPSERT.
 *
 * The previous implementation ran a SELECT to decide between INSERT and UPDATE,
 * which is two statements per call. On the ingest hot path that doubled the
 * write cost; a single INSERT ... ON CONFLICT DO UPDATE keeps the same "ensure
 * row 1 exists, then patch the provided fields" semantics in one statement.
 * Progress callers should route through the coalescer so this runs a few
 * hundred times per job rather than once per email.
 */
export async function setPollStatusInDb(
  update: PollStatusUpdate,
): Promise<void> {
  const ROW_ID = 1
  const db = getDb()

  const set: Partial<typeof pollStatus.$inferInsert> = {}
  if (update.isRunning !== undefined) set.isRunning = update.isRunning
  if (update.lastCheck !== undefined) set.lastCheck = update.lastCheck
  if (update.currentProcessed !== undefined)
    set.currentProcessed = update.currentProcessed
  if (update.totalEmails !== undefined) set.totalEmails = update.totalEmails
  if (update.processingEmails !== undefined)
    set.processingEmails = update.processingEmails
  if (update.etaMs !== undefined) set.etaMs = update.etaMs
  if (update.abortRequested !== undefined)
    set.abortRequested = update.abortRequested
  if (update.activeJobRunId !== undefined)
    set.activeJobRunId = update.activeJobRunId
  if (update.statusText !== undefined) set.statusText = update.statusText

  const insert = db.insert(pollStatus).values({ id: ROW_ID, ...set })

  if (Object.keys(set).length === 0) {
    await insert.onConflictDoNothing({ target: pollStatus.id })
    return
  }

  await insert.onConflictDoUpdate({ target: pollStatus.id, set })
}
