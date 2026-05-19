import { env } from '@/lib/env'
import type { ExchangeCodeInput, OidcTokenResponse } from '@/types/auth'

/**
 * Exchanges an authorization code (plus the PKCE verifier) for tokens at
 * the IdP's token endpoint. Uses client_secret_basic for client auth;
 * adjust if your IdP requires client_secret_post.
 */
export async function exchangeCodeForTokens(
  input: ExchangeCodeInput,
): Promise<OidcTokenResponse> {
  const clientId = env.OIDC_CLIENT_ID ?? ''
  const clientSecret = env.OIDC_CLIENT_SECRET ?? ''
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: input.code,
    redirect_uri: env.OIDC_REDIRECT_URI ?? '',
    code_verifier: input.codeVerifier,
    client_id: clientId,
  })
  const res = await fetch(input.discovery.token_endpoint, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      authorization:
        'Basic ' +
        Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`token exchange failed: ${res.status} ${text}`)
  }
  return (await res.json()) as OidcTokenResponse
}
