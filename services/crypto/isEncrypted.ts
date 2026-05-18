import { ENCRYPTION_PREFIX } from './encryptionPrefix'

/**
 * Cheap structural check: does this string look like a `v1:` ciphertext blob?
 * Returns false for plaintext and empty strings. Does not attempt to decrypt.
 */
function isEncrypted(value: string): boolean {
  return (
    typeof value === 'string' &&
    value.startsWith(ENCRYPTION_PREFIX) &&
    value.slice(ENCRYPTION_PREFIX.length).split('|').length === 3
  )
}

export { isEncrypted }
