import type { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * `checkInstall` verifies installation through a self-fetch to
 * `/api/install/check`. Two properties of that fetch are load-bearing behind a
 * reverse proxy, and getting either wrong sends every route to /install
 * forever even though the app is installed:
 *
 * - it must not forward the incoming headers (Cloudflare answers 403 to a
 *   request carrying `cf-connecting-ip` from outside its own network), and
 * - it must not speak TLS to the loopback listener, which a TLS-terminating
 *   proxy provokes by pairing the forwarded `https` scheme with the local host.
 *
 * The module caches its result, so each test imports it fresh.
 */
describe('checkInstall', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  const buildRequest = (url: string, pathname: string): NextRequest =>
    ({
      url,
      nextUrl: { pathname },
      headers: new Headers({
        'cf-connecting-ip': '203.0.113.10',
        cookie: 'session=secret',
      }),
    }) as unknown as NextRequest

  const importCheckInstall = async () => {
    vi.resetModules()
    const mod = await import('../src/services/install/checkInstall')
    return mod.checkInstall
  }

  beforeEach(() => {
    fetchMock = vi.fn(() =>
      Promise.resolve(
        Response.json({ data: { installed: true, requiresToken: false } }),
      ),
    )
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('sends no headers on the install-check self-fetch', async () => {
    const checkInstall = await importCheckInstall()

    await checkInstall(
      buildRequest('http://localhost:3000/domains', '/domains'),
    )

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit | undefined
    expect(init?.headers).toBeUndefined()
  })

  it('downgrades https to http when the check target is the loopback', async () => {
    const checkInstall = await importCheckInstall()

    await checkInstall(
      buildRequest('https://localhost:3002/domains', '/domains'),
    )

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'http://localhost:3002/api/install/check',
    )
  })

  it('keeps https for a real remote hostname', async () => {
    const checkInstall = await importCheckInstall()

    await checkInstall(
      buildRequest('https://dmarc.example.com/domains', '/domains'),
    )

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://dmarc.example.com/api/install/check',
    )
  })

  it('redirects to /install when the check cannot be reached', async () => {
    fetchMock.mockRejectedValue(new TypeError('fetch failed'))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const checkInstall = await importCheckInstall()

    const response = await checkInstall(
      buildRequest('http://localhost:3000/domains', '/domains'),
    )

    expect(response?.headers.get('location')).toBe(
      'http://localhost:3000/install',
    )
  })
})
