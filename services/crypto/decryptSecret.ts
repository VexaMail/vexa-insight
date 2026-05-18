import crypto from 'node:crypto'
import { deriveEncryptionKey } from './deriveEncryptionKey'
import { ENCRYPTION_PREFIX } from './encryptionPrefix'

/**
 * Decrypts a `v1:` blob produced by encryptSecret. If the input does not
 * carry the `v1:` prefix, it is treated as legacy plaintext and returned
 * as-is — this is the migration path for rows written before AES-GCM
 * encryption was introduced.
 */
function decryptSecret(blob: string, secretKey: string): string {
  if (!blob) return ''
  if (!blob.startsWith(ENCRYPTION_PREFIX)) return blob
  const parts = blob.slice(ENCRYPTION_PREFIX.length).split('|')
  if (parts.length !== 3) {
    throw new Error('Malformed encrypted blob')
  }
  const [ivB64, tagB64, ctB64] = parts
  if (!ivB64 || !tagB64 || !ctB64) {
    throw new Error('Malformed encrypted blob')
  }
  const key = deriveEncryptionKey(secretKey)
  const iv = Buffer.from(ivB64, 'base64')
  const tag = Buffer.from(tagB64, 'base64')
  const ct = Buffer.from(ctB64, 'base64')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  const pt = Buffer.concat([decipher.update(ct), decipher.final()])
  return pt.toString('utf8')
}

export { decryptSecret }
