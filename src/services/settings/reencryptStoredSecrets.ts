import { appSettings, getDb, imapAccounts } from '@/lib/db'
import { decryptApiKey, encryptApiKey } from '@/services/ai'
import { decryptSecret, encryptSecret, isEncrypted } from '@/services/crypto'
import { SETTINGS_ID } from '@/services/settings-store'
import { eq } from 'drizzle-orm'

/**
 * Re-encrypts every secret that hangs off the instance key so a rotation does
 * not orphan them.
 *
 * The stored IMAP passwords and the AI provider key are both encrypted with a
 * key derived from `SECRET_KEY`. Writing a new key without touching them
 * leaves ciphertext nobody can read: the next configuration load throws, the
 * mailbox stops being polled, and the only visible symptom is a decryption
 * error far from the settings page where it was caused.
 *
 * Returns how many secrets moved to the new key, and is a no-op when the two
 * keys are the same.
 */
export function reencryptStoredSecrets(
  oldSecretKey: string,
  newSecretKey: string,
): number {
  if (!oldSecretKey || !newSecretKey || oldSecretKey === newSecretKey) return 0
  const db = getDb()
  let moved = 0

  for (const row of db
    .select({ id: imapAccounts.id, password: imapAccounts.password })
    .from(imapAccounts)
    .all()) {
    if (!isEncrypted(row.password)) continue
    const plaintext = decryptSecret(row.password, oldSecretKey)
    db.update(imapAccounts)
      .set({ password: encryptSecret(plaintext, newSecretKey) })
      .where(eq(imapAccounts.id, row.id))
      .run()
    moved += 1
  }

  const settings = db
    .select({
      aiApiKeyEncrypted: appSettings.aiApiKeyEncrypted,
      aiApiKeyIv: appSettings.aiApiKeyIv,
    })
    .from(appSettings)
    .where(eq(appSettings.id, SETTINGS_ID))
    .get()

  if (settings?.aiApiKeyEncrypted && settings.aiApiKeyIv) {
    // A key that already fails to decrypt is past saving; re-encrypting the
    // failure would only replace one unreadable value with another.
    const plaintext = decryptApiKey(
      settings.aiApiKeyEncrypted,
      settings.aiApiKeyIv,
      oldSecretKey,
    )
    if (plaintext !== null) {
      const { encrypted, iv } = encryptApiKey(plaintext, newSecretKey)
      db.update(appSettings)
        .set({ aiApiKeyEncrypted: encrypted, aiApiKeyIv: iv })
        .where(eq(appSettings.id, SETTINGS_ID))
        .run()
      moved += 1
    }
  }

  return moved
}
