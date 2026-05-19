import { env } from '@/lib/env'
import {
  OIDC_STATE_COOKIE,
  OIDC_VERIFIER_COOKIE,
  buildAuthorizationUrl,
  discoverIssuer,
  generatePkcePair,
  generateState,
} from '@/services/auth'
import { isOidcEnabled } from '@/utils/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * GET /api/auth/oidc/start — kicks off the SSO flow. Returns 404 when
 * OIDC is not configured so the endpoint is invisible by default.
 */
export async function GET(): Promise<NextResponse> {
  if (!isOidcEnabled()) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'OIDC not configured' } },
      { status: 404 },
    )
  }
  const issuer = env.OIDC_ISSUER_URL
  if (!issuer) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'OIDC not configured' } },
      { status: 404 },
    )
  }

  const discovery = await discoverIssuer(issuer)
  const state = generateState()
  const { verifier, challenge } = generatePkcePair()
  const url = buildAuthorizationUrl({
    discovery,
    state,
    codeChallenge: challenge,
  })

  const cookieStore = await cookies()
  const isProd = env.NODE_ENV === 'production'
  const fiveMinutes = 5 * 60
  cookieStore.set(OIDC_STATE_COOKIE, state, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: fiveMinutes,
    path: '/',
  })
  cookieStore.set(OIDC_VERIFIER_COOKIE, verifier, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: fiveMinutes,
    path: '/',
  })

  return NextResponse.redirect(url)
}
