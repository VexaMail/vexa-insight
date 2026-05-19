import { getDb, users } from '@/lib/db'
import type { OidcUserInfo } from '@/types/auth'
import { eq } from 'drizzle-orm'
import crypto from 'node:crypto'

/**
 * Finds an existing user by username (the email claim is used as the
 * canonical identifier) or provisions a fresh one with the default role.
 * Returns the user's local DB id so the caller can establish a session.
 *
 * Just-in-time provisioning is intentional for the experimental SSO
 * scaffold: the alternative is locking out anyone whose IdP account
 * doesn't exactly match an existing record. Operators who want strict
 * allow-listing should disable SSO until a policy layer is added.
 */
export async function provisionUserFromUserInfo(
  info: OidcUserInfo,
): Promise<string> {
  const username = info.email ?? info.preferred_username ?? info.sub
  if (!username) {
    throw new Error('OIDC userinfo lacks email/preferred_username/sub')
  }
  const db = getDb()
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .get()
  if (existing) return existing.id

  const id = crypto.randomUUID()
  // No local password; we set a random unguessable hash placeholder so
  // password-based login cannot succeed for SSO-provisioned accounts.
  const placeholderHash = `oidc:${crypto.randomBytes(32).toString('hex')}`
  await db.insert(users).values({
    id,
    username,
    passwordHash: placeholderHash,
    role: 'viewer',
  })
  return id
}
