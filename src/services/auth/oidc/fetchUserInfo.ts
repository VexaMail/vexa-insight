import type { OidcDiscovery, OidcUserInfo } from '@/types/auth'

/**
 * Fetches the userinfo claims from the IdP. Throws if the endpoint is
 * not advertised by discovery or the request fails — callers should
 * surface this as an auth failure to the user.
 */
export async function fetchUserInfo(
  discovery: OidcDiscovery,
  accessToken: string,
): Promise<OidcUserInfo> {
  if (!discovery.userinfo_endpoint) {
    throw new Error('IdP does not advertise a userinfo_endpoint')
  }
  const res = await fetch(discovery.userinfo_endpoint, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  })
  if (!res.ok) {
    throw new Error(`userinfo failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as OidcUserInfo
}
