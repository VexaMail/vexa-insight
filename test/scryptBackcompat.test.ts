import crypto from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { hashPassword } from '../services/auth/hashPassword'
import { KEY_LENGTH } from '../services/auth/keyLength'
import { verifyPassword } from '../services/auth/verifyPassword'

describe('verifyPassword', () => {
  it('verifies a freshly hashed password (scrypt$ format)', () => {
    const stored = hashPassword('hunter2')
    expect(stored.startsWith('scrypt$')).toBe(true)
    expect(verifyPassword('hunter2', stored)).toBe(true)
    expect(verifyPassword('wrong', stored)).toBe(false)
  })

  it('accepts a legacy salt:hash record with default scrypt N', () => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.scryptSync('hunter2', salt, KEY_LENGTH).toString('hex')
    const stored = `${salt}:${hash}`
    expect(verifyPassword('hunter2', stored)).toBe(true)
    expect(verifyPassword('wrong', stored)).toBe(false)
  })

  it('rejects malformed records', () => {
    expect(verifyPassword('x', '')).toBe(false)
    expect(verifyPassword('x', 'not-a-hash')).toBe(false)
    expect(verifyPassword('x', 'scrypt$abc')).toBe(false)
  })
})
