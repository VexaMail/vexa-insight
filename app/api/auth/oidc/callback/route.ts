import { env } from '@/lib/env'
import { recordAuditEvent } from '@/services/audit'
import { completeOidcLogin, takeOidcCallbackCookies } from '@/services/auth'
import { isOidcEnabled } from '@/utils/auth'
import { oidcCallbackQuerySchema } from '@/validators/query'
import { NextResponse } from 'next/server'
import { oidcNotConfiguredResponse } from './oidcNotConfiguredResponse'
import { oidcUnauthorizedResponse } from './oidcUnauthorizedResponse'

/**
 * GET /api/auth/oidc/callback — completes the SSO flow.
 *
 * Validates state/verifier cookies (set by /start), exchanges the
 * authorization code for tokens, fetches userinfo, provisions or finds
 * the local user, records an audit event, and starts a session.
 */
export async function GET(request: Request): Promise<NextResponse> {
  if (!isOidcEnabled()) return oidcNotConfiguredResponse()
  const issuer = env.OIDC_ISSUER_URL
  if (!issuer) return oidcNotConfiguredResponse()

  const url = new URL(request.url)
  const query = oidcCallbackQuerySchema.safeParse({
    code: url.searchParams.get('code'),
    state: url.searchParams.get('state'),
  })
  if (!query.success) {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Missing code or state' } },
      { status: 400 },
    )
  }
  const { code, state } = query.data

  const { expectedState, verifier } = await takeOidcCallbackCookies()
  if (!expectedState || expectedState !== state || !verifier) {
    return oidcUnauthorizedResponse('Invalid state')
  }

  try {
    await completeOidcLogin({ issuer, code, codeVerifier: verifier })
    return NextResponse.redirect(new URL('/', request.url))
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await recordAuditEvent({
      action: 'auth.login.failure',
      metadata: { provider: 'oidc', reason: message },
    })
    return oidcUnauthorizedResponse('OIDC callback failed')
  }
}
