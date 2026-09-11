import { deriveApiToken, deriveEncryptionKey } from '@/services/crypto'
import { describe, expect, it } from 'vitest'

/**
 * The admin API token used to be `SECRET_KEY` itself, so the settings page
 * rendered the AES root into a browser and every automation client held it.
 */
describe('admin API token derivation', () => {
  const KEY = 'instance-secret-key-value-0123456789'

  it('is deterministic across calls', () => {
    expect(deriveApiToken(KEY)).toBe(deriveApiToken(KEY))
  })

  it('is not the secret it comes from', () => {
    const token = deriveApiToken(KEY)
    expect(token).not.toBe(KEY)
    expect(token).not.toContain(KEY)
    expect(token).toHaveLength(64)
  })

  it('changes with the key', () => {
    expect(deriveApiToken(KEY)).not.toBe(deriveApiToken(`${KEY}x`))
  })

  // The encryption key and the token share a secret and a salt, so only the
  // HKDF info label keeps them apart. A copy-paste there would hand the AES
  // key to every API client.
  it('differs from the encryption key derived from the same secret', () => {
    expect(deriveApiToken(KEY)).not.toBe(
      deriveEncryptionKey(KEY).toString('hex'),
    )
  })

  it('yields nothing for a secret too short to derive from', () => {
    expect(deriveApiToken('short')).toBe('')
    expect(deriveApiToken('')).toBe('')
  })
})
