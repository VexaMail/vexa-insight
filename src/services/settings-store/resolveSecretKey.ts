import { isDerivableSecret } from '@/utils/auth'
import { getEnvSecretKey } from './getEnvSecretKey'
import { getSettingsRow } from './getSettingsRow'

/**
 * The key every stored secret is encrypted with, or null when the instance
 * has none yet.
 *
 * The stored column wins when it holds a usable value, because that is the key
 * the existing ciphertext was actually written with: an instance whose key was
 * rotated through the settings page re-encrypted its secrets against that
 * value, and preferring the environment there would make every stored
 * credential unreadable. Deployments that never rotate in-app leave the column
 * at its placeholder, so the key is read from the environment and never
 * persisted. See `docs/adr/0003-secret-key-out-of-the-database.md`.
 */
export function resolveSecretKey(): string | null {
  const stored = getSettingsRow()?.secretKey
  if (isDerivableSecret(stored)) return stored as string
  return getEnvSecretKey()
}
