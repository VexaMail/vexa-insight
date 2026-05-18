import { encryptSecret, isEncrypted } from '@/services/crypto'
import type { DerivePasswordForWriteInput } from '@/types/settings'

/**
 * Decides what to write to `imap_accounts.password` when persisting a row.
 *
 * - New password supplied: encrypt it and use it.
 * - No new password but a stored value exists:
 *   - already encrypted → keep as-is
 *   - plaintext + we have a SECRET_KEY → encrypt now (lazy migration)
 *   - plaintext + no SECRET_KEY → keep plaintext (cannot encrypt yet)
 * - Otherwise: empty string.
 */
function derivePasswordForWrite(input: DerivePasswordForWriteInput): string {
  const { hasNewPassword, newPassword, existingPassword, secretKey } = input
  if (hasNewPassword && newPassword) {
    return encryptSecret(newPassword.trim(), secretKey)
  }
  const existing = existingPassword ?? ''
  if (!existing) return ''
  if (isEncrypted(existing)) return existing
  if (secretKey) return encryptSecret(existing, secretKey)
  return existing
}

export { derivePasswordForWrite }
