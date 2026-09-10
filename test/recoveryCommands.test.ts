import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * The README's only account-recovery path is this CLI, and a self-hosted
 * deployment reaches for it precisely when the app will not let anyone in. It
 * runs in a terminal, so nothing it touches may depend on a request scope.
 */
describe('recovery commands', () => {
  const USERNAME = 'admin@example.com'
  const PASSWORD = 'Str0ngPass!23'

  const readUser = async (username: string) => {
    const { findUserByUsername } = await import('@/services/auth')
    return findUserByUsername(username)
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
  })

  it('creates an admin and refuses to create it twice', async () => {
    const { createAdminAccount } = await import('@/services/recovery')

    await createAdminAccount(USERNAME, PASSWORD)

    expect((await readUser(USERNAME))?.role).toBe('admin')
    await expect(createAdminAccount(USERNAME, PASSWORD)).rejects.toThrow(
      /already exists/,
    )
  })

  it('replaces the password and ends the account sessions', async () => {
    const { createAdminAccount, resetAccountPassword } =
      await import('@/services/recovery')
    const { getDb, sessions } = await import('@/lib/db')
    const id = await createAdminAccount(USERNAME, PASSWORD)
    await getDb()
      .insert(sessions)
      .values({
        id: 'live-session',
        userId: id,
        expiresAt: new Date('2099-01-01T00:00:00Z'),
      })
    const before = (await readUser(USERNAME))?.passwordHash

    await resetAccountPassword(USERNAME, 'An0therPass!45')

    expect((await readUser(USERNAME))?.passwordHash).not.toBe(before)
    expect(await getDb().select().from(sessions)).toEqual([])
  })

  it('promotes an existing user and stays quiet on a repeat', async () => {
    const { promoteAccountToAdmin } = await import('@/services/recovery')
    const { createUser } = await import('@/services/users')
    await createUser({ username: USERNAME, password: PASSWORD, role: 'user' })

    await promoteAccountToAdmin(USERNAME)
    await promoteAccountToAdmin(USERNAME)

    expect((await readUser(USERNAME))?.role).toBe('admin')
  })

  it('reports a missing account rather than creating one', async () => {
    const { promoteAccountToAdmin, resetAccountPassword } =
      await import('@/services/recovery')

    await expect(promoteAccountToAdmin('ghost@example.com')).rejects.toThrow(
      /not found/,
    )
    await expect(
      resetAccountPassword('ghost@example.com', PASSWORD),
    ).rejects.toThrow(/not found/)
  })

  it('deletes every account so /install unlocks', async () => {
    const { createAdminAccount, deleteEveryUser } =
      await import('@/services/recovery')
    const { getDb, users } = await import('@/lib/db')
    await createAdminAccount(USERNAME, PASSWORD)
    await createAdminAccount('second@example.com', PASSWORD)

    expect(await deleteEveryUser()).toBe(2)
    expect(await getDb().select().from(users)).toEqual([])
  })
})
