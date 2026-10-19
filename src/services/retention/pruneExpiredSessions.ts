import { getDb, sessions } from '@/lib/db'
import { lte } from 'drizzle-orm'

/**
 * Deletes sessions whose expiry has passed. `getSession` already refuses
 * them; this removes the ones whose cookie never came back.
 */
export function pruneExpiredSessions(now: Date): number {
  return getDb().delete(sessions).where(lte(sessions.expiresAt, now)).run()
    .changes
}
