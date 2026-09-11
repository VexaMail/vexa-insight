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
  // rotateEncryptionKey enforces MIN_SECRET_LENGTH, which OLD_KEY is under.
  const ROTATION_OLD_KEY = 'rotation-old-secret-key-0123456789'
  const ROTATION_NEW_KEY = 'rotation-new-secret-key-9876543210'

  const seedImapPassword = async (key: string) => {
    const { getDb, imapAccounts } = await import('@/lib/db')
    const { encryptSecret } = await import('@/services/crypto')
    const db = getDb()
    await db.delete(imapAccounts)
    await db.insert(imapAccounts).values({
      server: 'imap.example.com',
      port: 993,
      username: 'reports@example.com',
      password: encryptSecret(IMAP_PASSWORD, key),
    })
  }

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

  // Rotation left the settings page with ADR 0010: the key is read from the
  // environment, which a running instance cannot rewrite for itself, so the
  // operator drives it from the recovery CLI with the instance stopped.
  it('rotates through the recovery CLI, keeping the mailbox usable', async () => {
    const { rotateEncryptionKey } = await import('@/services/recovery')
    const { getDb, imapAccounts } = await import('@/lib/db')
    const { decryptSecret } = await import('@/services/crypto')
    const previous = process.env['SECRET_KEY']
    process.env['SECRET_KEY'] = ROTATION_OLD_KEY
    await seedImapPassword(ROTATION_OLD_KEY)
    try {
      expect(rotateEncryptionKey(ROTATION_NEW_KEY)).toBeGreaterThan(0)
      const account = getDb().select().from(imapAccounts).get()
      expect(decryptSecret(account?.password ?? '', ROTATION_NEW_KEY)).toBe(
        IMAP_PASSWORD,
      )
    } finally {
      if (previous === undefined) delete process.env['SECRET_KEY']
      else process.env['SECRET_KEY'] = previous
    }
  })

  it('refuses to rotate without a key in the environment', async () => {
    const { rotateEncryptionKey } = await import('@/services/recovery')
    const previous = process.env['SECRET_KEY']
    delete process.env['SECRET_KEY']
    try {
      expect(() => rotateEncryptionKey(ROTATION_NEW_KEY)).toThrow(
        /SECRET_KEY is not set/,
      )
    } finally {
      if (previous !== undefined) process.env['SECRET_KEY'] = previous
    }
  })
})
