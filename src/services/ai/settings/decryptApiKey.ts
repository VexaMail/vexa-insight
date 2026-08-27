import crypto from 'node:crypto'

/**
 * Decrypts an API key that was encrypted with encryptApiKey.
 * Returns the plaintext key, or null if decryption fails.
 */
export function decryptApiKey(
  encryptedHex: string,
  ivHex: string,
  secretKey: string,
): string | null {
  try {
    const key = crypto.scryptSync(secretKey, 'vexa-ai-key-salt', 32)
    const iv = Buffer.from(ivHex, 'hex')
    const data = Buffer.from(encryptedHex, 'hex')
    const authTag = data.subarray(data.length - 16)
    const ciphertext = data.subarray(0, data.length - 16)
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ])
    return decrypted.toString('utf8')
  } catch {
    return null
  }
}
