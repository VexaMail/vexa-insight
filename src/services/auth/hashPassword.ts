import crypto from 'node:crypto'
import { KEY_LENGTH } from './keyLength'
import { SALT_LENGTH } from './saltLength'
import { SCRYPT_MAXMEM } from './scryptMaxMem'
import { SCRYPT_N } from './scryptN'
import { SCRYPT_P } from './scryptP'
import { SCRYPT_R } from './scryptR'

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex')
  const derivedKey = crypto.scryptSync(password, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
    maxmem: SCRYPT_MAXMEM,
  })
  return `scrypt$${String(SCRYPT_N)}$${String(SCRYPT_R)}$${String(SCRYPT_P)}$${salt}$${derivedKey.toString('hex')}`
}
