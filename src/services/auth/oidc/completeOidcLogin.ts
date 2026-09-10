import { recordAuditEvent } from '@/services/audit'
import type { CompleteOidcLoginInput } from '@/types/auth'
import { createSession } from '../createSession'
import { discoverIssuer } from './discoverIssuer'
import { exchangeCodeForTokens } from './exchangeCodeForTokens'
import { fetchUserInfo } from './fetchUserInfo'
import { provisionUserFromUserInfo } from './provisionUserFromUserInfo'

/**
 * Exchanges the authorization code for tokens, fetches userinfo, provisions
 * or finds the local user, starts a session and records the login. Throws
 * when any step fails; the caller audits the failure.
 */
export async function completeOidcLogin({
  issuer,
  code,
  codeVerifier,
}: CompleteOidcLoginInput): Promise<void> {
  const discovery = await discoverIssuer(issuer)
  const tokens = await exchangeCodeForTokens({ discovery, code, codeVerifier })
  const info = await fetchUserInfo(discovery, tokens.access_token)
  const userId = provisionUserFromUserInfo({ info, issuer })
  await createSession(userId)
  await recordAuditEvent({
    action: 'auth.login.success',
    actorId: userId,
    actorEmail: info.email ?? info.preferred_username ?? info.sub,
    metadata: { provider: 'oidc' },
  })
}
