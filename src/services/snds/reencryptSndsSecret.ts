import { decryptSecret, encryptSecret, isEncrypted } from '@/services/crypto'

/**
 * One stored SNDS secret moved from the old instance key to the new one, or
 * undefined when there is nothing encrypted to move.
 */
export function reencryptSndsSecret(
  value: string | null,
  oldSecretKey: string,
  newSecretKey: string,
): string | undefined {
  if (!value || !isEncrypted(value)) return undefined
  return encryptSecret(decryptSecret(value, oldSecretKey), newSecretKey)
}
