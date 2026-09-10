import { getDb, users } from '@/lib/db'
import {
  findUserByUsername,
  hashPassword,
  revokeUserSessions,
} from '@/services/auth'
import { eq } from 'drizzle-orm'

/**
 * Replaces an account's password from the CLI and ends its sessions, because a
 * reset that leaves the old cookies working is not a reset.
 *
 * This does not go through `updateUser`: that path reads the acting session to
 * write an audit row, and recovery runs in a terminal where there is no
 * request and therefore no session to read.
 */
export async function resetAccountPassword(
  username: string,
  password: string,
): Promise<string> {
  const user = findUserByUsername(username)
  if (!user) {
    throw new Error(`User "${username}" not found.`)
  }
  await getDb()
    .update(users)
    .set({ passwordHash: hashPassword(password), updatedAt: new Date() })
    .where(eq(users.id, user.id))
  await revokeUserSessions(user.id)
  return user.id
}
