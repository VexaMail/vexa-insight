import { MIN_ENCRYPTION_KEY_LENGTH } from '@/constants/auth'
import crypto from 'node:crypto'
import { ENCRYPTION_KEY_INFO } from './encryptionKeyInfo'
import { ENCRYPTION_KEY_SALT } from './encryptionKeySalt'

/**
 * Derives a 32-byte AES-256 key from the configured SECRET_KEY using HKDF-SHA256.
 * Salt and info are fixed module constants so the same SECRET_KEY always
 * yields the same derived key (deterministic across boots).
 */
function deriveEncryptionKey(secretKey: string): Buffer {
  if (!secretKey || secretKey.length < MIN_ENCRYPTION_KEY_LENGTH) {
    throw new Error('SECRET_KEY too short to derive encryption key (min 16)')
  }
  return Buffer.from(
    crypto.hkdfSync(
      'sha256',
      Buffer.from(secretKey),
      Buffer.from(ENCRYPTION_KEY_SALT),
      Buffer.from(ENCRYPTION_KEY_INFO),
      32,
    ),
  )
}

export { deriveEncryptionKey }
