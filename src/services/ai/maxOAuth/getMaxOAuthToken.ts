import { readMaxOAuthCredentials } from './readMaxOAuthCredentials'
import { refreshMaxOAuthToken } from './refreshMaxOAuthToken'

/**
 * Returns a currently-valid Max subscription access token.
 *
 * Prefers the Keychain token — Claude Code keeps it refreshed while it runs —
 * and only falls back to the refresh grant when the stored token is within a
 * minute of expiry.
 */
export async function getMaxOAuthToken(): Promise<string> {
  // Refresh this far ahead of expiry so a long request cannot outlive its token.
  const expirySkewMs = 60_000
  const credentials = readMaxOAuthCredentials()
  if (credentials.expiresAt - expirySkewMs > Date.now()) {
    return credentials.accessToken
  }
  return refreshMaxOAuthToken(credentials.refreshToken)
}
