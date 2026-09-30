import { afterEach, describe, expect, it, vi } from 'vitest'
import { clientIpFromHeaders } from '../src/utils/security/clientIpFromHeaders'

const CLIENT = '198.51.100.7'

function headers(init: Record<string, string>): Headers {
  return new Headers(init)
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('clientIpFromHeaders', () => {
  it('ignores a client-supplied entry in front of the proxy-appended one', () => {
    const forged = headers({ 'x-forwarded-for': `203.0.113.9, ${CLIENT}` })
    expect(clientIpFromHeaders(forged)).toBe(CLIENT)
  })

  it('returns the only entry a header-overwriting proxy leaves', () => {
    expect(clientIpFromHeaders(headers({ 'x-forwarded-for': CLIENT }))).toBe(
      CLIENT,
    )
  })

  it('skips one entry per trusted proxy hop', () => {
    vi.stubEnv('VEXA_TRUSTED_PROXY_HOPS', '2')
    const chain = headers({
      'x-forwarded-for': `203.0.113.9, ${CLIENT}, 192.0.2.1`,
    })
    expect(clientIpFromHeaders(chain)).toBe(CLIENT)
  })

  it('uses the leftmost entry when there are fewer entries than hops', () => {
    vi.stubEnv('VEXA_TRUSTED_PROXY_HOPS', '3')
    expect(clientIpFromHeaders(headers({ 'x-forwarded-for': CLIENT }))).toBe(
      CLIENT,
    )
  })

  it('falls back to one hop on an invalid setting', () => {
    vi.stubEnv('VEXA_TRUSTED_PROXY_HOPS', 'abc')
    const forged = headers({ 'x-forwarded-for': `203.0.113.9, ${CLIENT}` })
    expect(clientIpFromHeaders(forged)).toBe(CLIENT)
  })

  it('falls back to x-real-ip, then to null', () => {
    expect(clientIpFromHeaders(headers({ 'x-real-ip': CLIENT }))).toBe(CLIENT)
    expect(clientIpFromHeaders(headers({}))).toBeNull()
  })
})
