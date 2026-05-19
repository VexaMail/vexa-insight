import { describe, expect, it } from 'vitest'
import { requireSameOrigin } from '../services/security/requireSameOrigin'

describe('requireSameOrigin', () => {
  const req = (method: string, headers: Record<string, string> = {}): Request =>
    new Request('https://vexa.example.com/api/v1/users', { method, headers })

  it('passes GET unconditionally', () => {
    expect(requireSameOrigin(req('GET'))).toBeNull()
  })

  it('passes HEAD and OPTIONS', () => {
    expect(requireSameOrigin(req('HEAD'))).toBeNull()
    expect(requireSameOrigin(req('OPTIONS'))).toBeNull()
  })

  it('rejects POST with no Origin and no Sec-Fetch-Site', () => {
    const r = requireSameOrigin(req('POST'))
    expect(r?.status).toBe(403)
    expect(r?.error.code).toBe('CSRF_REJECTED')
  })

  it('passes POST with Sec-Fetch-Site: same-origin', () => {
    expect(
      requireSameOrigin(req('POST', { 'sec-fetch-site': 'same-origin' })),
    ).toBeNull()
  })

  it('passes POST with Sec-Fetch-Site: same-site', () => {
    expect(
      requireSameOrigin(req('POST', { 'sec-fetch-site': 'same-site' })),
    ).toBeNull()
  })

  it('passes POST with Sec-Fetch-Site: none (user-typed URL)', () => {
    expect(
      requireSameOrigin(req('POST', { 'sec-fetch-site': 'none' })),
    ).toBeNull()
  })

  it('rejects POST with Sec-Fetch-Site: cross-site', () => {
    expect(
      requireSameOrigin(req('POST', { 'sec-fetch-site': 'cross-site' }))
        ?.status,
    ).toBe(403)
  })

  it('passes POST with Origin matching host', () => {
    expect(
      requireSameOrigin(req('POST', { origin: 'https://vexa.example.com' })),
    ).toBeNull()
  })

  it('rejects POST with foreign Origin', () => {
    expect(
      requireSameOrigin(req('POST', { origin: 'https://evil.example.com' }))
        ?.status,
    ).toBe(403)
  })

  it('passes POST with x-api-key (API-key auth is CSRF-exempt)', () => {
    expect(requireSameOrigin(req('POST', { 'x-api-key': 'k' }))).toBeNull()
  })

  it('passes POST with Authorization: Bearer (API-key auth is CSRF-exempt)', () => {
    expect(
      requireSameOrigin(req('POST', { authorization: 'Bearer k' })),
    ).toBeNull()
  })

  it('rejects POST with Authorization but not Bearer scheme', () => {
    expect(
      requireSameOrigin(req('POST', { authorization: 'Basic xxx' }))?.status,
    ).toBe(403)
  })
})
