import { env } from '@/lib/env'

/**
 * True only when SSO/OIDC is selected as the auth provider AND every
 * required setting is non-empty. Routes/UI gate themselves on this so
 * misconfiguration returns a clean 404 instead of leaking endpoints.
 */
export function isOidcEnabled(): boolean {
  if (env.VEXA_AUTH_PROVIDER !== 'oidc') return false
  return Boolean(
    env.OIDC_ISSUER_URL &&
    env.OIDC_CLIENT_ID &&
    env.OIDC_CLIENT_SECRET &&
    env.OIDC_REDIRECT_URI,
  )
}
