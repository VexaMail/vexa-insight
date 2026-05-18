import crypto from 'node:crypto'
import { KEY_LENGTH } from './keyLength'
import { parseStoredHash } from './parseStoredHash'
import { SCRYPT_MAXMEM } from './scryptMaxMem'

export function verifyPassword(password: string, stored: string): boolean {
  const parsed = parseStoredHash(stored)
  if (!parsed) return false
  const expected = Buffer.from(parsed.hash, 'hex')
  const computed = crypto.scryptSync(password, parsed.salt, KEY_LENGTH, {
    ...parsed.opts,
    maxmem: SCRYPT_MAXMEM,
  })
  if (computed.length !== expected.length) return false
  return crypto.timingSafeEqual(computed, expected)
}
