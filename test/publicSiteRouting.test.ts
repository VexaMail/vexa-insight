import { NextRequest } from 'next/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { register } from '../instrumentation'
import { routePublicSite } from '../src/utils/proxy/routePublicSite'

afterEach(() => vi.unstubAllEnvs())

describe('public website boundary', () => {
  it('rewrites the public hostname root without installation or authentication', () => {
    const response = routePublicSite(
      new NextRequest('https://insight.vexamail.com/'),
    )
    expect(response?.headers.get('x-middleware-rewrite')).toBe(
      'https://insight.vexamail.com/website',
    )
  })
  it.each([
    '/settings',
    '/install',
    '/login',
    '/api/v1/domains',
    '/api/install',
    '/api/auth/login',
    '/api/v1/domains.json',
    '/reports',
  ])('blocks private path %s on the public hostname', (path) => {
    expect(
      routePublicSite(new NextRequest(`https://insight.vexamail.com${path}`))
        ?.status,
    ).toBe(404)
  })
  it.each([
    '/api/public/domain-check',
    '/vexa-insight-logo.svg',
    '/vexa-insight-logo-dark.svg',
    '/_next/static/test.js',
  ])('allows public resource %s', (path) => {
    expect(
      routePublicSite(
        new NextRequest(`https://insight.vexamail.com${path}`),
      )?.headers.get('x-middleware-next'),
    ).toBe('1')
  })
  it('preserves private-host routing and allows local landing previews', () => {
    expect(
      routePublicSite(new NextRequest('https://private.example.com/settings')),
    ).toBeUndefined()
    expect(
      routePublicSite(new NextRequest('https://private.example.com/')),
    ).toBeUndefined()
    expect(
      routePublicSite(new NextRequest('http://localhost/website'))?.status,
    ).toBe(200)
  })
  it('isolates every hostname when running a standalone public instance', async () => {
    vi.stubEnv('PUBLIC_SITE_ONLY', 'true')
    vi.stubEnv('NEXT_RUNTIME', 'nodejs')
    expect(
      routePublicSite(new NextRequest('http://localhost/api/install'))?.status,
    ).toBe(404)
    await expect(register()).resolves.toBeUndefined()
  })
})
