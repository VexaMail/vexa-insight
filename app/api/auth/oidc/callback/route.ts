import { env } from '@/lib/env'
import { recordAuditEvent } from '@/services/audit'
import {
  OIDC_STATE_COOKIE,
  OIDC_VERIFIER_COOKIE,
  createSession,
  discoverIssuer,
  exchangeCodeForTokens,
  fetchUserInfo,
  provisionUserFromUserInfo,
} from '@/services/auth'
import { isOidcEnabled } from '@/utils/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * GET /api/auth/oidc/callback — completes the SSO flow.
 *
 * Validates state/verifier cookies (set by /start), exchanges the
 * authorization code for tokens, fetches userinfo, provisions or finds
 * the local user, records an audit event, and starts a session.
 */
export async function GET(request: Request): Promise<NextResponse> {
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

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (!code || !state) {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Missing code or state' } },
      { status: 400 },
    )
  }

  const cookieStore = await cookies()
  const expectedState = cookieStore.get(OIDC_STATE_COOKIE)?.value
  const verifier = cookieStore.get(OIDC_VERIFIER_COOKIE)?.value
  cookieStore.delete(OIDC_STATE_COOKIE)
  cookieStore.delete(OIDC_VERIFIER_COOKIE)
  if (!expectedState || expectedState !== state || !verifier) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Invalid state' } },
      { status: 401 },
    )
  }

  try {
    const discovery = await discoverIssuer(issuer)
    const tokens = await exchangeCodeForTokens({
      discovery,
      code,
      codeVerifier: verifier,
    })
    const info = await fetchUserInfo(discovery, tokens.access_token)
    const userId = await provisionUserFromUserInfo(info)
    await createSession(userId)
    await recordAuditEvent({
      action: 'auth.login.success',
      actorId: userId,
      actorEmail: info.email ?? info.preferred_username ?? info.sub,
      metadata: { provider: 'oidc' },
    })
    return NextResponse.redirect(new URL('/', request.url))
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await recordAuditEvent({
      action: 'auth.login.failure',
      metadata: { provider: 'oidc', reason: message },
    })
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'OIDC callback failed' } },
      { status: 401 },
    )
  }
}
