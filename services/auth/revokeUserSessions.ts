import { getDb, sessions } from '@/lib/db'
import { eq } from 'drizzle-orm'

/**
 * Deletes every session row belonging to a user and returns how many were
 * removed. Unlike `invalidateSession`, which signs the current visitor out,
 * this ends the account's sessions wherever they are — the caller's own
 * included, when they are that user.
 *
 * Used when a password changes: rewriting `passwordHash` alone leaves a
 * stolen cookie working, which defeats the point of the reset.
 */
export async function revokeUserSessions(userId: string): Promise<number> {
  const db = getDb()
  const result = await db.delete(sessions).where(eq(sessions.userId, userId))
  return result.changes
}
