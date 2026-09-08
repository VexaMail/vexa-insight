import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth/getSession', () => ({
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

/**
 * A password reset that leaves the old cookies working is not a reset, so
 * `updateUser` must end the account's sessions whenever it rewrites the
 * password hash -- and must leave them alone for every other kind of edit.
 */
describe('session revocation on password change', () => {
  const NOW = new Date('2026-01-15T12:00:00Z')
  const LATER = new Date('2026-02-15T12:00:00Z')
  // Opaque test values; nothing here is verified against a real hash.
  const STORED_HASH = 'stored-hash-placeholder'
  const REPLACEMENT_SECRET = 'replacement-secret'

  const insertUserWithSessions = async (
    id: string,
    sessionIds: string[],
  ): Promise<void> => {
    const { getDb, sessions, users } = await import('@/lib/db')
    const db = getDb()
    await db.insert(users).values({
      id,
      username: `${id}@example.com`,
      passwordHash: STORED_HASH,
      role: 'user',
    })
    for (const sessionId of sessionIds) {
      await db
        .insert(sessions)
        .values({ id: sessionId, userId: id, expiresAt: LATER })
    }
  }

  const liveSessionIds = async (): Promise<string[]> => {
    const { getDb, sessions } = await import('@/lib/db')
    const rows = await getDb().select({ id: sessions.id }).from(sessions)
    return rows.map((r) => r.id).sort((a, b) => a.localeCompare(b))
  }

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { getDb, auditLog, sessions, users } = await import('@/lib/db')
    const db = getDb()
    await db.delete(sessions)
    await db.delete(auditLog)
    await db.delete(users)
    vi.setSystemTime(NOW)
  })

  it('ends every session of the user whose password changed', async () => {
    const { updateUser } = await import('@/services/users')
    await insertUserWithSessions('target', ['s1', 's2'])
    await insertUserWithSessions('bystander', ['s3'])

    await updateUser('target', { password: REPLACEMENT_SECRET })

    // Only the bystander's cookie survives.
    expect(await liveSessionIds()).toEqual(['s3'])
  })

  it('leaves sessions alone for edits that are not a password change', async () => {
    const { updateUser } = await import('@/services/users')
    await insertUserWithSessions('target', ['s1', 's2'])

    await updateUser('target', { username: 'renamed@example.com' })
    await updateUser('target', { allowedDomains: ['example.com'] })

    expect(await liveSessionIds()).toEqual(['s1', 's2'])
  })

  it('records one audit event naming the target and the session count', async () => {
    const { auditLog, getDb } = await import('@/lib/db')
    const { updateUser } = await import('@/services/users')
    await insertUserWithSessions('target', ['s1', 's2'])

    await updateUser('target', { password: REPLACEMENT_SECRET })

    const events = await getDb().select().from(auditLog)
    const revocation = events.filter(
      (e) => e.action === 'auth.sessions.revoked',
    )
    expect(revocation).toHaveLength(1)
    expect(revocation[0]?.targetId).toBe('target')
    expect(JSON.parse(revocation[0]?.metadata ?? '{}')).toEqual({
      reason: 'password_change',
      revoked: 2,
    })
  })

  it('revokes nothing and still succeeds when the user has no sessions', async () => {
    const { revokeUserSessions } = await import('@/services/auth')
    await insertUserWithSessions('target', [])

    expect(await revokeUserSessions('target')).toBe(0)
  })
})
