import type { pollStatus } from '@/lib/db'
import type { PollStatusUpdate } from './PollStatusUpdate'

/**
 * The columns an update names; fields left undefined stay untouched.
 */
export function pollStatusPatch(
  update: PollStatusUpdate,
): Partial<typeof pollStatus.$inferInsert> {
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
  return set
}
