/**
 * Subset of the OpenID Connect Discovery document we actually use.
 * See https://openid.net/specs/openid-connect-discovery-1_0.html
 */
export type OidcDiscovery = {
  issuer: string
  authorization_endpoint: string
  token_endpoint: string
  userinfo_endpoint?: string
  jwks_uri?: string
  code_challenge_methods_supported?: string[]
  response_types_supported?: string[]
}
