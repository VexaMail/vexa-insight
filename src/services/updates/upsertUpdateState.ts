import { UPDATE_STATE_ID } from '@/constants/updates'
import { getDb, updateState } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { buildUpdateStatePatch } from './buildUpdateStatePatch'
import type { UpsertUpdateStateInput } from './UpsertUpdateStateInput'

/**
 * Insert-or-update the single update_state row (id = UPDATE_STATE_ID).
 * Only the keys present in the input are written; missing keys are preserved
 * on update and defaulted (where applicable) on insert.
 */
export function upsertUpdateState(input: UpsertUpdateStateInput): void {
  const db = getDb()
  const patch = buildUpdateStatePatch(input, new Date())
  const existing = db
    .select({ id: updateState.id })
    .from(updateState)
    .where(eq(updateState.id, UPDATE_STATE_ID))
    .limit(1)
    .get()
  if (!existing) {
    db.insert(updateState)
      .values({
        id: UPDATE_STATE_ID,
        enabled: true,
        channel: 'stable',
        currentVersion: null,
        latestVersion: null,
        latestUrl: null,
        latestPublishedAt: null,
        latestNotes: null,
        lastCheckedAt: null,
        lastErrorAt: null,
        lastError: null,
        ...patch,
      })
      .run()
    return
  }
  db.update(updateState)
    .set(patch)
    .where(eq(updateState.id, UPDATE_STATE_ID))
    .run()
}
