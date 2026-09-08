import { createCspNonce } from '@/utils/security'
import { describe, expect, it } from 'vitest'

describe('createCspNonce', () => {
  it('returns a base64 string', () => {
    const nonce = createCspNonce()
    expect(nonce).toMatch(/^[A-Z0-9+/]+=*$/i)
  })

  it('returns a fresh value per call', () => {
    expect(createCspNonce()).not.toBe(createCspNonce())
  })
})
