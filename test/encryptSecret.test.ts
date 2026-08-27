import { describe, expect, it } from 'vitest'
import { decryptSecret } from '../src/services/crypto/decryptSecret'
import { encryptSecret } from '../src/services/crypto/encryptSecret'
import { isEncrypted } from '../src/services/crypto/isEncrypted'

export const SECRET = 'this-is-a-32-character-test-key-AA'

describe('encryptSecret / decryptSecret', () => {
  it('round-trips a plain string', () => {
    const ct = encryptSecret('hunter2', SECRET)
    expect(ct).toMatch(/^v1:/)
    expect(decryptSecret(ct, SECRET)).toBe('hunter2')
  })

  it('produces different ciphertexts for the same plaintext (random IV)', () => {
    const a = encryptSecret('same', SECRET)
    const b = encryptSecret('same', SECRET)
    expect(a).not.toBe(b)
  })

  it('detects encrypted vs plain', () => {
    expect(isEncrypted('v1:aaa|bbb|ccc')).toBe(true)
    expect(isEncrypted('hunter2')).toBe(false)
    expect(isEncrypted('')).toBe(false)
  })

  it('decryptSecret passes legacy plaintext through unchanged', () => {
    expect(decryptSecret('plain-legacy', SECRET)).toBe('plain-legacy')
    expect(decryptSecret('', SECRET)).toBe('')
  })

  it('throws on tampered ciphertext', () => {
    const ct = encryptSecret('hunter2', SECRET)
    const [iv, tag] = ct.slice(3).split('|')
    const tampered = `v1:${iv}|${tag}|${Buffer.from('zzzzzzzz').toString('base64')}`
    expect(() => decryptSecret(tampered, SECRET)).toThrow()
  })
})
