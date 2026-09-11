import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * Releases up to 0.2.2 seeded SECRET_KEY from the environment into
 * `app_settings.secret_key`, which left the AES key inside the very database it
 * encrypts. The key now resolves from the environment unless the column holds a
 * usable value of its own, and a stored copy that merely duplicates the
 * environment is dropped on boot.
 */
describe('secret key resolution', () => {
  const ENV_KEY = 'env-secret-key-value-0123456789ab'
  const STORED_KEY = 'stored-secret-key-value-98765432'
  const originalEnvKey = process.env['SECRET_KEY']

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { appSettings, getDb } = await import('@/lib/db')
    const { PLACEHOLDER_SECRET } = await import('@/constants/auth')
    const { SETTINGS_ID } = await import('@/services/settings-store')
    const { eq } = await import('drizzle-orm')
    await getDb()
      .update(appSettings)
      .set({ secretKey: PLACEHOLDER_SECRET, installedAt: null })
      .where(eq(appSettings.id, SETTINGS_ID))
    delete process.env['SECRET_KEY']
  })

  afterEach(() => {
    if (originalEnvKey === undefined) delete process.env['SECRET_KEY']
    else process.env['SECRET_KEY'] = originalEnvKey
  })

  const setStoredKey = async (value: string) => {
    const { appSettings, getDb } = await import('@/lib/db')
    const { SETTINGS_ID } = await import('@/services/settings-store')
    const { eq } = await import('drizzle-orm')
    await getDb()
      .update(appSettings)
      .set({ secretKey: value })
      .where(eq(appSettings.id, SETTINGS_ID))
  }

  const readStoredKey = async () => {
    const { getSettingsRow } = await import('@/services/settings-store')
    return getSettingsRow()?.secretKey
  }

  it('reads the key from the environment when the column is a placeholder', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    const { resolveSecretKey } = await import('@/services/settings-store')
    expect(resolveSecretKey()).toBe(ENV_KEY)
  })

  it('returns null when neither the environment nor the column has one', async () => {
    const { resolveSecretKey } = await import('@/services/settings-store')
    expect(resolveSecretKey()).toBeNull()
  })

  // An instance whose key was rotated through the settings page re-encrypted
  // its secrets against the stored value. Preferring the environment there
  // would make every stored credential unreadable.
  it('prefers a stored key over a different environment key', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    await setStoredKey(STORED_KEY)
    const { resolveSecretKey } = await import('@/services/settings-store')
    expect(resolveSecretKey()).toBe(STORED_KEY)
  })

  it('drops a stored copy that only duplicates the environment', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    await setStoredKey(ENV_KEY)
    const { clearDuplicatedSecretKey, resolveSecretKey } =
      await import('@/services/settings-store')
    const { PLACEHOLDER_SECRET } = await import('@/constants/auth')
    clearDuplicatedSecretKey()
    expect(await readStoredKey()).toBe(PLACEHOLDER_SECRET)
    expect(resolveSecretKey()).toBe(ENV_KEY)
  })

  it('keeps a stored key that differs from the environment', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    await setStoredKey(STORED_KEY)
    const { clearDuplicatedSecretKey } =
      await import('@/services/settings-store')
    clearDuplicatedSecretKey()
    expect(await readStoredKey()).toBe(STORED_KEY)
  })

  it('does not seed the environment key into the database', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    const { seedSettingsFromEnv } = await import('@/services/settings-store')
    const { PLACEHOLDER_SECRET } = await import('@/constants/auth')
    seedSettingsFromEnv()
    expect(await readStoredKey()).toBe(PLACEHOLDER_SECRET)
  })
})
