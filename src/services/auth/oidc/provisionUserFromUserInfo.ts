import { getDb, users } from '@/lib/db'
import { env } from '@/lib/env'
import type { ProvisionUserFromUserInfoInput } from '@/types/auth'
import { and, eq } from 'drizzle-orm'
import crypto from 'node:crypto'

/**
 * Resolves the local user for an authenticated OIDC identity and returns its
 * DB id so the caller can establish a session.
 *
 * The identity is the (issuer, subject) pair, which is the only identifier the
 * provider guarantees to be stable and unique. Email is used for the display
 * username only, and only when the provider marks it verified: an unverified
 * claim is attacker-controlled at many IdPs.
 *
 * A login never adopts a pre-existing local account unless
 * OIDC_ALLOW_EMAIL_LINKING is on, because that account may be an
 * administrator's and the IdP can assert any address it likes. With the flag
 * on, the adoption happens once and writes the subject binding, so later
 * logins match on the subject rather than on the email.
 *
 * Just-in-time provisioning of *new* users stays liberal, as the experimental
 * SSO scaffold documents: anyone the IdP authenticates gets a `viewer` row.
 */
export function provisionUserFromUserInfo({
  info,
  issuer,
}: ProvisionUserFromUserInfoInput): string {
  if (!info.sub) throw new Error('OIDC userinfo lacks sub')
  const db = getDb()

  const bound = db
    .select()
    .from(users)
    .where(and(eq(users.oidcIssuer, issuer), eq(users.oidcSubject, info.sub)))
    .get()
  if (bound) return bound.id

  const verifiedEmail = info.email_verified === true ? info.email : undefined
  const username = verifiedEmail ?? info.preferred_username ?? info.sub

  const existing = db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .get()
  if (existing) {
    if (!env.OIDC_ALLOW_EMAIL_LINKING) {
      throw new Error(
        `local account "${username}" exists and is not bound to this OIDC subject`,
      )
    }
    db.update(users)
      .set({ oidcIssuer: issuer, oidcSubject: info.sub })
      .where(eq(users.id, existing.id))
      .run()
    return existing.id
  }

  const id = crypto.randomUUID()
  // No local password; we set a random unguessable hash placeholder so
  // password-based login cannot succeed for SSO-provisioned accounts.
  const placeholderHash = `oidc:${crypto.randomBytes(32).toString('hex')}`
  db.insert(users)
    .values({
      id,
      username,
      passwordHash: placeholderHash,
      role: 'viewer',
      oidcIssuer: issuer,
      oidcSubject: info.sub,
    })
    .run()
  return id
}
