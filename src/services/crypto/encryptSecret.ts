import crypto from 'node:crypto'
import { deriveEncryptionKey } from './deriveEncryptionKey'
import { ENCRYPTION_PREFIX } from './encryptionPrefix'

/**
 * Encrypts a plaintext secret with AES-256-GCM and returns a versioned blob
 * of the form `v1:<iv-b64>|<tag-b64>|<ciphertext-b64>`. The IV is a fresh
 * random 12 bytes per call, so two calls with identical input produce
 * different output. The GCM tag authenticates the ciphertext.
 */
function encryptSecret(plaintext: string, secretKey: string): string {
  if (plaintext.length === 0) return ''
  const key = deriveEncryptionKey(secretKey)
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return (
    ENCRYPTION_PREFIX +
    [iv.toString('base64'), tag.toString('base64'), ct.toString('base64')].join(
      '|',
    )
  )
}

export { encryptSecret }
