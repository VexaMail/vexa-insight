import { decryptSecret, isEncrypted } from '@/services/crypto'

/**
 * Returns the usable IMAP password for a stored row.
 *
 * An encrypted value with no key available is a hard error. Passing the
 * ciphertext through would send it to the mail server as the password, turning
 * a configuration fault into an authentication failure with no visible cause.
 */
export function decryptStoredPassword(
  password: string,
  secretKey: string | null,
  accountId: number,
): string {
  if (!password) return password
  if (secretKey) return decryptSecret(password, secretKey)
  if (!isEncrypted(password)) return password
  throw new Error(
    `imap_accounts.id=${String(accountId)} holds an encrypted password but no ` +
      'SECRET_KEY is available. Set SECRET_KEY in the environment to the value ' +
      'the instance was installed with.',
  )
}
