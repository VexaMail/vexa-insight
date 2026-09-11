import { MIN_SECRET_LENGTH } from '@/constants/auth'
import { reencryptStoredSecrets } from '@/services/settings'
import { getEnvSecretKey } from '@/services/settings-store'

/**
 * Moves every stored secret from the instance's current encryption root to a
 * new one.
 *
 * The root lives in the environment (ADR 0010), which a running instance cannot
 * change for itself — hence a CLI command rather than a settings field. Run it
 * with the instance stopped: between the re-encryption and the environment
 * change, nothing can read the stored credentials.
 *
 * Returns how many secrets moved.
 */
export function rotateEncryptionKey(newSecretKey: string): number {
  const current = getEnvSecretKey()
  if (!current) {
    throw new Error(
      'SECRET_KEY is not set, so there is no key to rotate away from. Set it ' +
        'to the value this instance was installed with and try again.',
    )
  }
  const next = newSecretKey.trim()
  if (next.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `The new key must be at least ${String(MIN_SECRET_LENGTH)} characters.`,
    )
  }
  if (next === current) throw new Error('The new key matches the current one.')
  return reencryptStoredSecrets(current, next)
}
