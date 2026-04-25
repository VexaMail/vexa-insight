import { getDb, pollStatus } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { PollStatusUpdate } from './PollStatusUpdate'

/**
 * Updates the persisted poll status. Ensures row exists then updates.
 */
export async function setPollStatusInDb(
  update: PollStatusUpdate,
): Promise<void> {
  const ROW_ID = 1
  const db = getDb()
  const row = await db
    .select()
    .from(pollStatus)
    .where(eq(pollStatus.id, ROW_ID))
    .limit(1)
    .then((rows) => rows[0])

  if (!row) {
    await db.insert(pollStatus).values({
      id: ROW_ID,
      isRunning: update.isRunning ?? false,
      lastCheck: update.lastCheck ?? null,
      currentProcessed: update.currentProcessed ?? 0,
      totalEmails: update.totalEmails ?? 0,
      processingEmails: update.processingEmails ?? 0,
      etaMs: update.etaMs ?? 0,
      abortRequested: update.abortRequested ?? false,
      activeJobRunId: update.activeJobRunId ?? null,
      statusText: update.statusText ?? null,
    })
    return
  }

  const set: {
    isRunning?: boolean
    lastCheck?: Date | null
    currentProcessed?: number
    totalEmails?: number
    processingEmails?: number
    etaMs?: number
    abortRequested?: boolean
    activeJobRunId?: number | null
    statusText?: string | null
  } = {}
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
  if (Object.keys(set).length === 0) return
  await db.update(pollStatus).set(set).where(eq(pollStatus.id, ROW_ID))
}
