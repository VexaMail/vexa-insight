/**
 * Subset of an OAuth 2.0 / OIDC token endpoint response. The `id_token`
 * field is OIDC-specific and contains the user claims as a signed JWT.
 */
export type OidcTokenResponse = {
  access_token: string
  token_type: string
  expires_in?: number
  refresh_token?: string
  id_token?: string
  scope?: string
}
