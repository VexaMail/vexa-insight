import crypto from 'node:crypto'

/**
 * Generates a PKCE verifier/challenge pair (RFC 7636) for the
 * authorization-code-with-PKCE flow. We always use S256.
 */
export function generatePkcePair(): { verifier: string; challenge: string } {
  const verifier = crypto.randomBytes(32).toString('base64url')
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url')
  return { verifier, challenge }
}
