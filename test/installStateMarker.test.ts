import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * `isInstalled` used to read `secret_key !== 'CHANGE_ME'`, which tied the
 * install state to where the encryption key was stored and made it impossible
 * to take the key out of the database. `installed_at` now carries that fact on
 * its own.
 */
describe('install state marker', () => {
  const originalEnvKey = process.env['SECRET_KEY']

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { appSettings, getDb, users } = await import('@/lib/db')
    const { PLACEHOLDER_SECRET } = await import('@/constants/auth')
    const { SETTINGS_ID } = await import('@/services/settings-store')
    const { eq } = await import('drizzle-orm')
    await getDb().delete(users)
    await getDb()
      .update(appSettings)
      .set({ secretKey: PLACEHOLDER_SECRET, installedAt: null })
      .where(eq(appSettings.id, SETTINGS_ID))
    if (originalEnvKey === undefined) delete process.env['SECRET_KEY']
    else process.env['SECRET_KEY'] = originalEnvKey
  })

  it('reports not installed on a fresh database', async () => {
    delete process.env['SECRET_KEY']
    const { isInstalled, isPartiallyInstalled } =
      await import('@/services/install')
    expect(isInstalled()).toBe(false)
    expect(isPartiallyInstalled()).toBe(false)
  })

  // The container documented in the README boots with SECRET_KEY in its
  // environment and nothing in the database. That was enough to skip the
  // settings half of the wizard before the key moved out, and still is.
  it('treats an environment key alone as initialized settings', async () => {
    process.env['SECRET_KEY'] = 'env-secret-key-value-0123456789ab'
    const { isPartiallyInstalled } = await import('@/services/install')
    expect(isPartiallyInstalled()).toBe(true)
  })

  it('stays installed with a placeholder secret once marked', async () => {
    delete process.env['SECRET_KEY']
    const { appSettings, getDb, users } = await import('@/lib/db')
    const { SETTINGS_ID } = await import('@/services/settings-store')
    const { eq } = await import('drizzle-orm')
    await getDb()
      .update(appSettings)
      .set({ installedAt: new Date() })
      .where(eq(appSettings.id, SETTINGS_ID))
    await getDb().insert(users).values({
      id: 'test-admin',
      username: 'admin@example.com',
      passwordHash: 'x',
      role: 'admin',
    })
    const { isInstalled, isPartiallyInstalled } =
      await import('@/services/install')
    expect(isInstalled()).toBe(true)
    expect(isPartiallyInstalled()).toBe(false)
  })
})
