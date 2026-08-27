import crypto from 'node:crypto'

/**
 * Encrypts an API key using AES-256-GCM derived from the instance secret key.
 * Returns the ciphertext and IV as hex strings.
 */
export function encryptApiKey(
  plaintext: string,
  secretKey: string,
): { encrypted: string; iv: string } {
  const key = crypto.scryptSync(secretKey, 'vexa-ai-key-salt', 32)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()
  return {
    encrypted: Buffer.concat([encrypted, authTag]).toString('hex'),
    iv: iv.toString('hex'),
  }
}
