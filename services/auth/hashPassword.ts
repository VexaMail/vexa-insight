import crypto from 'node:crypto'
import { KEY_LENGTH } from './keyLength'
import { SALT_LENGTH } from './saltLength'

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex')
  const derivedKey = crypto.scryptSync(password, salt, KEY_LENGTH)
  return `${salt}:${derivedKey.toString('hex')}`
}
