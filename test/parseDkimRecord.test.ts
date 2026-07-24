import { describe, expect, it } from 'vitest'
import { parseDkimRecord } from '../services/diagnostics/parseDkimRecord'

describe('parseDkimRecord', () => {
  // Base64 lengths match real RSA SubjectPublicKeyInfo encodings: the
  // estimator subtracts the DER overhead and rounds to the nearest 256 bits.
  const strongKey = 'A'.repeat(392) // 294 bytes -> 2048-bit modulus
  const mediumKey = 'A'.repeat(216) // 162 bytes -> 1024-bit modulus
  const weakKey = 'A'.repeat(100) // 75 bytes -> ~256-bit modulus

  it('reports a missing record for the selector', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: null,
      valid: false,
    })

    expect(result.valid).toBe(false)
    expect(result.raw).toBeNull()
    expect(result.publicKeyPresent).toBe(false)
    expect(result.keyLengthBits).toBeNull()
    expect(result.errors).toEqual(['No DKIM record found for this selector.'])
  })

  it('parses a valid Google-style record with a strong key', () => {
    const result = parseDkimRecord({
      selector: 'google',
      record: `v=DKIM1; k=rsa; p=${strongKey}`,
      valid: true,
    })

    expect(result.valid).toBe(true)
    expect(result.version).toBe('DKIM1')
    expect(result.keyType).toBe('rsa')
    expect(result.publicKeyPresent).toBe(true)
    expect(result.keyLengthBits).toBe(2048)
    expect(result.errors).toEqual([])
  })

  it('defaults the key type to rsa when k= is absent', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; p=${strongKey}`,
      valid: true,
    })

    expect(result.keyType).toBe('rsa')
    expect(result.valid).toBe(true)
  })

  it('treats a missing v= tag as valid with a null version', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `k=rsa; p=${strongKey}`,
      valid: true,
    })

    expect(result.version).toBeNull()
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('rejects an unexpected version value', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM2; k=rsa; p=${strongKey}`,
      valid: true,
    })

    expect(result.valid).toBe(false)
    expect(result.errors).toContain(
      'Invalid version: "DKIM2". Expected "DKIM1".',
    )
  })

  it('flags an empty p= tag as a revoked key', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: 'v=DKIM1; k=rsa; p=',
      valid: false,
    })

    expect(result.valid).toBe(false)
    expect(result.publicKeyPresent).toBe(false)
    expect(result.keyLengthBits).toBeNull()
    expect(result.errors).toContain('Public key (p=) is empty or revoked.')
  })

  it('flags a key under 1024 bits as too weak', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; k=rsa; p=${weakKey}`,
      valid: true,
    })

    expect(result.valid).toBe(false)
    expect(result.keyLengthBits).toBe(256)
    expect(result.errors).toContain(
      'Key length is approximately 256 bits. Minimum recommended is 1024 bits.',
    )
  })

  it('recommends upgrading keys between 1024 and 2048 bits', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; k=rsa; p=${mediumKey}`,
      valid: true,
    })

    expect(result.valid).toBe(false)
    expect(result.keyLengthBits).toBe(1024)
    expect(result.errors).toContain(
      'Key length is approximately 1024 bits. 2048 bits or higher is recommended for better security.',
    )
  })

  it('detects duplicate tags', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; k=rsa; k=rsa; p=${strongKey}`,
      valid: true,
    })

    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Duplicate tag "k" found.')
  })

  it('ignores empty segments from a trailing semicolon', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; k=rsa; p=${strongKey};`,
      valid: true,
    })

    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('extracts a non-rsa key type', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; k=ed25519; p=${'A'.repeat(44)}`,
      valid: true,
    })

    expect(result.keyType).toBe('ed25519')
    expect(result.keyLengthBits).toBe(264)
    expect(result.errors).toContain(
      'Unexpected Ed25519 key size (33 bytes; expected 32).',
    )
  })

  it('accepts a standard 32-byte Ed25519 key without weak-key errors', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; k=ed25519; p=${'A'.repeat(43)}=`,
      valid: true,
    })

    expect(result.keyType).toBe('ed25519')
    expect(result.keyLengthBits).toBe(256)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('marks the parsed record invalid when the resolver flagged it invalid', () => {
    const result = parseDkimRecord({
      selector: 'selector1',
      record: `v=DKIM1; k=rsa; p=${strongKey}`,
      valid: false,
    })

    expect(result.errors).toEqual([])
    expect(result.valid).toBe(false)
  })
})
