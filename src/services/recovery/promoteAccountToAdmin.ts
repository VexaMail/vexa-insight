import { getDb, users } from '@/lib/db'
import { findUserByUsername } from '@/services/auth'
import { eq } from 'drizzle-orm'

/**
 * Raises an existing account to the admin role. Already-admin accounts are
 * left alone rather than treated as an error, so the command is safe to repeat.
 *
 * Like `resetAccountPassword`, this writes directly rather than going through
 * `updateUser`, which needs a request-scoped session for its audit row.
 */
export async function promoteAccountToAdmin(username: string): Promise<string> {
  const user = findUserByUsername(username)
  if (!user) {
    throw new Error(`User "${username}" not found.`)
  }
  if (user.role !== 'admin') {
    await getDb()
      .update(users)
      .set({ role: 'admin', updatedAt: new Date() })
      .where(eq(users.id, user.id))
  }
  return user.id
}
