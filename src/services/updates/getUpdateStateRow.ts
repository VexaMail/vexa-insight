import { UPDATE_STATE_ID } from '@/constants/updates'
import { getDb, updateState } from '@/lib/db'
import type { UpdateChannel, UpdateStateRow } from '@/types/updates'
import { eq } from 'drizzle-orm'

/**
 * Read the (single) update_state row. Returns null when no row exists yet
 * (e.g. fresh install before the first check has run).
 */
export function getUpdateStateRow(): UpdateStateRow | null {
  const db = getDb()
  const row = db
    .select()
    .from(updateState)
    .where(eq(updateState.id, UPDATE_STATE_ID))
    .limit(1)
    .get()
  if (!row) return null
  const channel: UpdateChannel =
    row.channel === 'prerelease' ? 'prerelease' : 'stable'
  return {
    enabled: row.enabled,
    channel,
    currentVersion: row.currentVersion,
    latestVersion: row.latestVersion,
    latestUrl: row.latestUrl,
    latestPublishedAt: row.latestPublishedAt,
    latestNotes: row.latestNotes,
    lastCheckedAt: row.lastCheckedAt,
    lastErrorAt: row.lastErrorAt,
    lastError: row.lastError,
  }
}
