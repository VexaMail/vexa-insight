import type { OidcCallbackCookies } from '@/types/auth'
import { cookies } from 'next/headers'
import { OIDC_STATE_COOKIE } from './oidcStateCookieName'
import { OIDC_VERIFIER_COOKIE } from './oidcVerifierCookieName'

/**
 * Reads the state and PKCE verifier set by /start and clears both, so a
 * callback can be replayed neither on success nor on failure.
 */
export async function takeOidcCallbackCookies(): Promise<OidcCallbackCookies> {
  const cookieStore = await cookies()
  const expectedState = cookieStore.get(OIDC_STATE_COOKIE)?.value
  const verifier = cookieStore.get(OIDC_VERIFIER_COOKIE)?.value
  cookieStore.delete(OIDC_STATE_COOKIE)
  cookieStore.delete(OIDC_VERIFIER_COOKIE)
  return { expectedState, verifier }
}
