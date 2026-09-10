import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * An SSO login must not be able to take over an account it does not own. The
 * IdP can assert any email address, so the identity that decides which local
 * row a session belongs to is the (issuer, subject) pair, and adopting a
 * pre-existing local account is opt-in.
 */
describe('OIDC account linking', () => {
  const ISSUER = 'https://idp.example.com'
  const OTHER_ISSUER = 'https://other-idp.example.com'
  const ADMIN_USERNAME = 'admin@example.com'
  const UNBOUND_SUBJECT_ERROR = /not bound to this OIDC subject/

  const insertLocalUser = async (
    id: string,
    username: string,
    role: string,
  ): Promise<void> => {
    const { getDb, users } = await import('@/lib/db')
    await getDb()
      .insert(users)
      .values({ id, username, passwordHash: 'stored-hash-placeholder', role })
  }

  const readUser = async (id: string) => {
    const { getDb, users } = await import('@/lib/db')
    const { eq } = await import('drizzle-orm')
    return getDb().select().from(users).where(eq(users.id, id)).get()
  }

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { getDb, sessions, users } = await import('@/lib/db')
    const db = getDb()
    await db.delete(sessions)
    await db.delete(users)
    vi.unstubAllEnvs()
  })

  it('refuses to adopt an existing local account by email claim', async () => {
    const { provisionUserFromUserInfo } = await import('@/services/auth')
    await insertLocalUser('admin-id', ADMIN_USERNAME, 'admin')

    expect(() =>
      provisionUserFromUserInfo({
        issuer: ISSUER,
        info: {
          sub: 'attacker-subject',
          email: ADMIN_USERNAME,
          email_verified: true,
        },
      }),
    ).toThrow(UNBOUND_SUBJECT_ERROR)
  })

  it('ignores an unverified email and provisions on the subject', async () => {
    const { provisionUserFromUserInfo } = await import('@/services/auth')
    await insertLocalUser('admin-id', ADMIN_USERNAME, 'admin')

    const id = provisionUserFromUserInfo({
      issuer: ISSUER,
      info: {
        sub: 'attacker-subject',
        email: ADMIN_USERNAME,
        email_verified: false,
      },
    })

    expect(id).not.toBe('admin-id')
    const created = await readUser(id)
    expect(created?.username).toBe('attacker-subject')
    expect(created?.role).toBe('viewer')
  })

  it('returns the same row for a repeated subject', async () => {
    const { provisionUserFromUserInfo } = await import('@/services/auth')
    const info = {
      sub: 'stable-subject',
      email: 'person@example.com',
      email_verified: true,
    }

    const first = provisionUserFromUserInfo({ issuer: ISSUER, info })
    const second = provisionUserFromUserInfo({ issuer: ISSUER, info })

    expect(second).toBe(first)
  })

  it('keeps the same subject at a different issuer separate', async () => {
    const { provisionUserFromUserInfo } = await import('@/services/auth')
    const info = {
      sub: 'stable-subject',
      email: 'person@example.com',
      email_verified: true,
    }

    const first = provisionUserFromUserInfo({ issuer: ISSUER, info })

    expect(() =>
      provisionUserFromUserInfo({ issuer: OTHER_ISSUER, info }),
    ).toThrow(UNBOUND_SUBJECT_ERROR)
    expect(await readUser(first)).toBeDefined()
  })

  it('adopts an existing account once when linking is enabled', async () => {
    vi.stubEnv('OIDC_ALLOW_EMAIL_LINKING', 'true')
    vi.resetModules()
    const { provisionUserFromUserInfo } = await import('@/services/auth')
    await insertLocalUser('admin-id', ADMIN_USERNAME, 'admin')

    const id = provisionUserFromUserInfo({
      issuer: ISSUER,
      info: {
        sub: 'admin-subject',
        email: ADMIN_USERNAME,
        email_verified: true,
      },
    })

    expect(id).toBe('admin-id')
    const linked = await readUser('admin-id')
    expect(linked?.oidcIssuer).toBe(ISSUER)
    expect(linked?.oidcSubject).toBe('admin-subject')
  })
})
