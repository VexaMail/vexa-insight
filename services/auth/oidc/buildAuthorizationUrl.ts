import { env } from '@/lib/env'
import type { BuildAuthorizationUrlInput } from '@/types/auth'

/**
 * Builds the authorization endpoint URL with the OAuth params required
 * for an authorization-code-with-PKCE flow.
 */
export function buildAuthorizationUrl(
  input: BuildAuthorizationUrlInput,
): string {
  const url = new URL(input.discovery.authorization_endpoint)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', env.OIDC_CLIENT_ID ?? '')
  url.searchParams.set('redirect_uri', env.OIDC_REDIRECT_URI ?? '')
  url.searchParams.set('scope', env.OIDC_SCOPES)
  url.searchParams.set('state', input.state)
  url.searchParams.set('code_challenge', input.codeChallenge)
  url.searchParams.set('code_challenge_method', 'S256')
  return url.toString()
}
