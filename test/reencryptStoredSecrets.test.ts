import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * Rotating the instance key used to strand everything encrypted with the old
 * one: the stored IMAP passwords and the AI provider key stayed as they were,
 * and the next configuration load threw a decryption error nowhere near the
 * settings page that caused it. The rotation now carries them over.
 */
describe('secret key rotation', () => {
  const OLD_KEY = 'old-secret-key-value-0123456789'
  const NEW_KEY = 'new-secret-key-value-9876543210'
  const IMAP_PASSWORD = 'mailbox-password'
  const AI_KEY = 'sk-provider-key'

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { appSettings, getDb, imapAccounts } = await import('@/lib/db')
    const { encryptSecret } = await import('@/services/crypto')
    const { encryptApiKey } = await import('@/services/ai')
    const { eq } = await import('drizzle-orm')
    const db = getDb()
    await db.delete(imapAccounts)
    await db.insert(imapAccounts).values({
      server: 'imap.example.com',
      port: 993,
      username: 'reports@example.com',
      password: encryptSecret(IMAP_PASSWORD, OLD_KEY),
    })
    const { encrypted, iv } = encryptApiKey(AI_KEY, OLD_KEY)
    await db
      .update(appSettings)
      .set({ secretKey: OLD_KEY, aiApiKeyEncrypted: encrypted, aiApiKeyIv: iv })
      .where(eq(appSettings.id, 1))
  })

  it('moves every stored secret onto the new key', async () => {
    const { reencryptStoredSecrets } = await import('@/services/settings')
    const { appSettings, getDb, imapAccounts } = await import('@/lib/db')
    const { decryptSecret } = await import('@/services/crypto')
    const { decryptApiKey } = await import('@/services/ai')
    const { eq } = await import('drizzle-orm')

    expect(reencryptStoredSecrets(OLD_KEY, NEW_KEY)).toBe(2)

    const db = getDb()
    const account = db.select().from(imapAccounts).get()
    expect(decryptSecret(account?.password ?? '', NEW_KEY)).toBe(IMAP_PASSWORD)
    const settings = db
      .select()
      .from(appSettings)
      .where(eq(appSettings.id, 1))
      .get()
    expect(
      decryptApiKey(
        settings?.aiApiKeyEncrypted ?? '',
        settings?.aiApiKeyIv ?? '',
        NEW_KEY,
      ),
    ).toBe(AI_KEY)
  })

  it('leaves everything alone when the key does not change', async () => {
    const { reencryptStoredSecrets } = await import('@/services/settings')
    const { getDb, imapAccounts } = await import('@/lib/db')
    const before = getDb().select().from(imapAccounts).get()?.password

    expect(reencryptStoredSecrets(OLD_KEY, OLD_KEY)).toBe(0)

    expect(getDb().select().from(imapAccounts).get()?.password).toBe(before)
  })

  it('rotates through updateSettings, keeping the mailbox usable', async () => {
    const { updateSettings } = await import('@/services/settings')
    const { invalidateConfigCache } = await import('@/lib/config')
    const { getDb, imapAccounts } = await import('@/lib/db')
    const { decryptSecret } = await import('@/services/crypto')
    invalidateConfigCache()

    updateSettings({ secretKey: NEW_KEY })
    invalidateConfigCache()

    const account = getDb().select().from(imapAccounts).get()
    expect(decryptSecret(account?.password ?? '', NEW_KEY)).toBe(IMAP_PASSWORD)
  })
})
