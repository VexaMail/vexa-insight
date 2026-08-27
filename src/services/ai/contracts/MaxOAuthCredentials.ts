/**
 * Shape of the `claudeAiOauth` object Claude Code stores in the macOS Keychain
 * under the `Claude Code-credentials` generic-password entry.
 */
export type MaxOAuthCredentials = {
  accessToken: string
  refreshToken: string
  expiresAt: number
  refreshTokenExpiresAt: number
  scopes: string[]
  subscriptionType: string
  rateLimitTier: string
}
