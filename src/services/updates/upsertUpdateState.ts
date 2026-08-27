import { UPDATE_STATE_ID } from '@/constants/updates'
import { getDb, updateState } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { UpsertUpdateStateInput } from './UpsertUpdateStateInput'

/**
 * Insert-or-update the single update_state row (id = UPDATE_STATE_ID).
 * Only the keys present in the input are written; missing keys are preserved
 * on update and defaulted (where applicable) on insert.
 */
export function upsertUpdateState(input: UpsertUpdateStateInput): void {
  const db = getDb()
  const now = new Date()
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
        enabled: input.enabled ?? true,
        channel: input.channel ?? 'stable',
        currentVersion: input.currentVersion ?? null,
        latestVersion: input.latestVersion ?? null,
        latestUrl: input.latestUrl ?? null,
        latestPublishedAt: input.latestPublishedAt ?? null,
        latestNotes: input.latestNotes ?? null,
        lastCheckedAt: input.lastCheckedAt ?? null,
        lastErrorAt: input.lastErrorAt ?? null,
        lastError: input.lastError ?? null,
        updatedAt: now,
      })
      .run()
    return
  }
  const patch: Record<string, unknown> = { updatedAt: now }
  if (input.enabled !== undefined) patch.enabled = input.enabled
  if (input.channel !== undefined) patch.channel = input.channel
  if (input.currentVersion !== undefined)
    patch.currentVersion = input.currentVersion
  if (input.latestVersion !== undefined)
    patch.latestVersion = input.latestVersion
  if (input.latestUrl !== undefined) patch.latestUrl = input.latestUrl
  if (input.latestPublishedAt !== undefined)
    patch.latestPublishedAt = input.latestPublishedAt
  if (input.latestNotes !== undefined) patch.latestNotes = input.latestNotes
  if (input.lastCheckedAt !== undefined)
    patch.lastCheckedAt = input.lastCheckedAt
  if (input.lastErrorAt !== undefined) patch.lastErrorAt = input.lastErrorAt
  if (input.lastError !== undefined) patch.lastError = input.lastError
  db.update(updateState)
    .set(patch)
    .where(eq(updateState.id, UPDATE_STATE_ID))
    .run()
}
