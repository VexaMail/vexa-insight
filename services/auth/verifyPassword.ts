import crypto from 'node:crypto'
import { KEY_LENGTH } from './keyLength'

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, key] = hash.split(':')
  if (!salt || !key) return false

  const derivedKey = crypto.scryptSync(password, salt, KEY_LENGTH)
  const keyBuffer = Buffer.from(key, 'hex')

  if (derivedKey.length !== keyBuffer.length) return false
  return crypto.timingSafeEqual(derivedKey, keyBuffer)
}
