import { NextRequest, NextResponse } from 'next/server'
import { describe, expect, it } from 'vitest'
import { withApiAuth } from '../services/api/withApiAuth'

describe('withApiAuth', () => {
  const fakeRequest = (headers: Record<string, string> = {}): NextRequest =>
    new NextRequest('http://localhost/api/v1/reports', { headers })

  it('returns 401 when no session and no api key', async () => {
    const handler = withApiAuth(
      async () => NextResponse.json({ data: 'secret' }),
      {
        authFn: async () => ({
          status: 401,
          error: { code: 'UNAUTHORIZED', message: 'no' },
        }),
      },
    )
    const res = await handler(fakeRequest())
    expect(res.status).toBe(401)
  })

  it('invokes handler when authFn returns null', async () => {
    const handler = withApiAuth(async () => NextResponse.json({ data: 'ok' }), {
      authFn: async () => null,
    })
    const res = await handler(fakeRequest())
    expect(res.status).toBe(200)
  })

  it('rejects cross-origin POST before auth runs', async () => {
    const handler = withApiAuth(
      async () => NextResponse.json({ data: 'should never reach' }),
      { authFn: async () => null },
    )
    const req = new NextRequest('https://vexa.example.com/api/v1/users', {
      method: 'POST',
      headers: { origin: 'https://evil.example.com' },
    })
    const res = await handler(req)
    expect(res.status).toBe(403)
  })
})
