import { MIN_ENCRYPTION_KEY_LENGTH } from '@/constants/auth'
import crypto from 'node:crypto'
import { API_TOKEN_INFO } from './apiTokenInfo'
import { ENCRYPTION_KEY_SALT } from './encryptionKeySalt'

/**
 * Derives the admin API token from `SECRET_KEY` with HKDF-SHA256.
 *
 * The two used to be the same string, so the settings page rendered the AES
 * root into a browser and every automation client held it. Deriving one from
 * the other keeps the single secret an operator has to manage while making the
 * token useless for decrypting anything: HKDF does not run backwards.
 *
 * Deterministic, so the token survives a restart, and it changes when the key
 * is rotated.
 */
export function deriveApiToken(secretKey: string): string {
  if (!secretKey || secretKey.length < MIN_ENCRYPTION_KEY_LENGTH) return ''
  return Buffer.from(
    crypto.hkdfSync(
      'sha256',
      Buffer.from(secretKey),
      Buffer.from(ENCRYPTION_KEY_SALT),
      Buffer.from(API_TOKEN_INFO),
      32,
    ),
  ).toString('hex')
}
