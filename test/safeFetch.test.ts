import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deliverWebhook } from '../src/services/notifications/deliverWebhook'
import { safeFetch } from '../src/services/security/safeFetch'

// Every hostname resolves to a public-looking address so the guard's DNS step
// is hermetic. 192.0.3.1 sits outside every reserved range the guard knows,
// including the documentation ranges, which it rejects on purpose.
vi.mock('node:dns/promises', () => ({
  default: {
    lookup: async () => Promise.resolve([{ address: '192.0.3.1', family: 4 }]),
  },
}))

const fetchMock = vi.fn()
const ORIGIN = 'https://example.com/a'
const PUBLIC_TARGET = 'https://example.net/final'

function redirectTo(location: string, status = 302): Response {
  return new Response(null, { status, headers: { location } })
}

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('safeFetch', () => {
  it('rejects ftp://', async () => {
    const res = await safeFetch('ftp://example.com/x', { method: 'GET' })
    expect(res).toMatchObject({
      ok: false,
      error: { code: 'SCHEME_NOT_ALLOWED' },
    })
  })

  it('rejects file://', async () => {
    const res = await safeFetch('file:///etc/passwd', { method: 'GET' })
    expect(res.ok).toBe(false)
  })

  it('rejects literal loopback IPv4', async () => {
    const res = await safeFetch('http://127.0.0.1:80/x', { method: 'GET' })
    expect(res).toMatchObject({
      ok: false,
      error: { code: 'PRIVATE_HOST_NOT_ALLOWED' },
    })
  })

  it('rejects literal AWS metadata IP', async () => {
    const res = await safeFetch('http://169.254.169.254/latest/', {
      method: 'GET',
    })
    expect(res).toMatchObject({
      ok: false,
      error: { code: 'PRIVATE_HOST_NOT_ALLOWED' },
    })
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
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('safeFetch (redirects)', () => {
  it('dispatches with redirect: manual', async () => {
    fetchMock.mockResolvedValueOnce(new Response('ok', { status: 200 }))
    await safeFetch(ORIGIN, { method: 'GET' })
    expect(fetchMock).toHaveBeenCalledWith(
      ORIGIN,
      expect.objectContaining({ redirect: 'manual' }),
    )
  })

  it('refuses a redirect from a public host to a loopback address', async () => {
    fetchMock.mockResolvedValueOnce(redirectTo('http://127.0.0.1/internal'))
    const res = await safeFetch(ORIGIN, { method: 'GET' })
    expect(res).toMatchObject({
      ok: false,
      error: { code: 'REDIRECT_BLOCKED' },
    })
    expect(res.error?.message).toContain('PRIVATE_HOST_NOT_ALLOWED')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('stops a redirect chain longer than the hop bound', async () => {
    fetchMock.mockImplementation(async (url: string) =>
      Promise.resolve(redirectTo(`${url}/next`)),
    )
    const res = await safeFetch(ORIGIN, { method: 'GET' })
    expect(res).toMatchObject({
      ok: false,
      error: { code: 'TOO_MANY_REDIRECTS' },
    })
    expect(fetchMock).toHaveBeenCalledTimes(4)
  })

  it('follows a redirect to another public host', async () => {
    fetchMock
      .mockResolvedValueOnce(redirectTo(PUBLIC_TARGET))
      .mockResolvedValueOnce(new Response('done', { status: 200 }))
    const res = await safeFetch(ORIGIN, { method: 'GET' })
    expect(res).toMatchObject({ ok: true, status: 200, dispatched: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[1]?.[0]).toBe(PUBLIC_TARGET)
  })

  it('resolves a relative Location against the current URL', async () => {
    fetchMock
      .mockResolvedValueOnce(redirectTo('/moved', 308))
      .mockResolvedValueOnce(new Response('done', { status: 200 }))
    await safeFetch('https://example.com/dir/a', { method: 'GET' })
    expect(fetchMock.mock.calls[1]?.[0]).toBe('https://example.com/moved')
  })

  it('turns a POST into a body-less GET on 302, as browsers do', async () => {
    fetchMock
      .mockResolvedValueOnce(redirectTo(PUBLIC_TARGET))
      .mockResolvedValueOnce(new Response('done', { status: 200 }))
    await safeFetch(ORIGIN, {
      method: 'POST',
      body: '{}',
      headers: { 'content-type': 'application/json' },
    })
    const second = fetchMock.mock.calls[1]?.[1] as RequestInit
    expect(second.method).toBe('GET')
    expect(second.body).toBeNull()
    expect(new Headers(second.headers).has('content-type')).toBe(false)
  })

  it('replays a POST unchanged on 307', async () => {
    fetchMock
      .mockResolvedValueOnce(redirectTo(PUBLIC_TARGET, 307))
      .mockResolvedValueOnce(new Response('done', { status: 200 }))
    await safeFetch(ORIGIN, { method: 'POST', body: '{}' })
    const second = fetchMock.mock.calls[1]?.[1] as RequestInit
    expect(second.method).toBe('POST')
    expect(second.body).toBe('{}')
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
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
