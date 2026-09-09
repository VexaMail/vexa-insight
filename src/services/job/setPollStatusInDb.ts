import { getDb, pollStatus } from '@/lib/db'
import { pollStatusPatch } from './pollStatusPatch'
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

  const set = pollStatusPatch(update)

  const insert = db.insert(pollStatus).values({ id: ROW_ID, ...set })

  if (Object.keys(set).length === 0) {
    await insert.onConflictDoNothing({ target: pollStatus.id })
    return
  }

  await insert.onConflictDoUpdate({ target: pollStatus.id, set })
}
