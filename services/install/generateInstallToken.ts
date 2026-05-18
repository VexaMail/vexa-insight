import crypto from 'node:crypto'

/**
 * Generates a fresh one-time install token (48 hex chars / 24 bytes of entropy).
 * Pure: does not mutate the install token store.
 */
export function generateInstallToken(): string {
  return crypto.randomBytes(24).toString('hex')
}
