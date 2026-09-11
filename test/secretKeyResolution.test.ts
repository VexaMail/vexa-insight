import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * Releases up to 0.2.2 seeded SECRET_KEY from the environment into
 * `app_settings.secret_key`, which left the AES key inside the very database it
 * encrypts. Since ADR 0010 the key resolves from the environment and from
 * nowhere else, and the boot purge rewrites the file so the old bytes go with
 * the column.
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

  it('reads the key from the environment', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    const { resolveSecretKey } = await import('@/services/settings-store')
    expect(resolveSecretKey()).toBe(ENV_KEY)
  })

  it('returns null when the environment has none', async () => {
    await setStoredKey(STORED_KEY)
    const { resolveSecretKey } = await import('@/services/settings-store')
    expect(resolveSecretKey()).toBeNull()
  })

  // The whole point of ADR 0010: a key sitting in the file it encrypts is not
  // a second source to fall back on, it is the leak.
  it('never falls back to the stored column', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    await setStoredKey(STORED_KEY)
    const { resolveSecretKey } = await import('@/services/settings-store')
    expect(resolveSecretKey()).toBe(ENV_KEY)
  })

  it('purges a stored copy that duplicates the environment', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    await setStoredKey(ENV_KEY)
    const { purgeStoredSecretKey } = await import('@/services/settings-store')
    const { PLACEHOLDER_SECRET } = await import('@/constants/auth')
    purgeStoredSecretKey()
    expect(await readStoredKey()).toBe(PLACEHOLDER_SECRET)
  })

  // That column is the only key its ciphertext will open. Blanking it would
  // destroy the credentials rather than protect them.
  it('keeps a stored key that differs from the environment', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    await setStoredKey(STORED_KEY)
    const { purgeStoredSecretKey } = await import('@/services/settings-store')
    purgeStoredSecretKey()
    expect(await readStoredKey()).toBe(STORED_KEY)
  })

  it('does not seed the environment key into the database', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    const { seedSettingsFromEnv } = await import('@/services/settings-store')
    const { PLACEHOLDER_SECRET } = await import('@/constants/auth')
    seedSettingsFromEnv()
    expect(await readStoredKey()).toBe(PLACEHOLDER_SECRET)
  })

  // A settings save used to write the environment's key straight back into the
  // column the purge had just cleared.
  it('does not write the key back when settings are saved', async () => {
    process.env['SECRET_KEY'] = ENV_KEY
    const { updateSettings } = await import('@/services/settings')
    const { invalidateConfigCache } = await import('@/lib/config')
    const { PLACEHOLDER_SECRET } = await import('@/constants/auth')
    invalidateConfigCache()
    updateSettings({ ingestionDaysBack: 7 })
    expect(await readStoredKey()).toBe(PLACEHOLDER_SECRET)
  })
})
