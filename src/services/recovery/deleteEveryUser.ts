import { getDb, sessions, users } from '@/lib/db'

/**
 * Deletes every user and every session, which unlocks `/install` so a fresh
 * administrator can be created through the browser. Destructive and
 * irreversible for the accounts themselves; report rows and settings, including
 * the key that decrypts stored IMAP credentials, are untouched.
 *
 * Returns how many accounts were removed so the caller can say what happened.
 */
export async function deleteEveryUser(): Promise<number> {
  const db = getDb()
  const existing = await db.select({ id: users.id }).from(users)
  await db.delete(sessions)
  await db.delete(users)
  return existing.length
}
