import crypto from 'node:crypto'

/**
 * Generates a cryptographically random OAuth 2.0 `state` value used to
 * bind the authorization request to its callback (RFC 6749 §10.12).
 */
export function generateState(): string {
  return crypto.randomBytes(16).toString('base64url')
}
