/**
 * Minimal user-info claim set we rely on to provision users. Real IdPs
 * return more fields; we ignore them.
 */
export type OidcUserInfo = {
  sub: string
  email?: string
  email_verified?: boolean
  name?: string
  preferred_username?: string
}
