/* eslint-disable sonarjs/no-clear-text-protocols -- this file tests that safeFetch rejects http loopback/metadata literals; cleartext URLs are the inputs under test */
import { describe, expect, it } from 'vitest'
import { deliverWebhook } from '../services/notifications/deliverWebhook'
import { safeFetch } from '../services/security/safeFetch'

describe('safeFetch', () => {
  it('rejects ftp://', async () => {
    const res = await safeFetch('ftp://example.com/x', { method: 'GET' })
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.error.code).toBe('SCHEME_NOT_ALLOWED')
  })

  it('rejects file://', async () => {
    const res = await safeFetch('file:///etc/passwd', { method: 'GET' })
    expect(res.ok).toBe(false)
  })

  it('rejects literal loopback IPv4', async () => {
    const res = await safeFetch('http://127.0.0.1:80/x', { method: 'GET' })
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.error.code).toBe('PRIVATE_HOST_NOT_ALLOWED')
  })

  it('rejects literal AWS metadata IP', async () => {
    const res = await safeFetch('http://169.254.169.254/latest/', { method: 'GET' })
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.error.code).toBe('PRIVATE_HOST_NOT_ALLOWED')
  })

  it('rejects literal IPv6 loopback', async () => {
    const res = await safeFetch('http://[::1]:80/x', { method: 'GET' })
    expect(res.ok).toBe(false)
  })

  it('accepts a normal public host without dispatching when allowDispatch=false', async () => {
    const res = await safeFetch('https://api.github.com/zen', {
      method: 'GET',
      allowDispatch: false,
    })
    expect(res.ok).toBe(true)
    expect(res.dispatched).toBe(false)
  })
})

describe('deliverWebhook (SSRF guard)', () => {
  it('refuses to dispatch to 169.254.169.254', async () => {
    const res = await deliverWebhook(
      'http://169.254.169.254/latest/meta-data/',
      '{}',
      null,
    )
    expect(res.status).toBeNull()
    expect(res.error).toContain('PRIVATE_HOST_NOT_ALLOWED')
  })
})
