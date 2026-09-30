import { SNDS_CLIENT_ID, SNDS_SCOPE, SNDS_TOKEN_URL } from '@/constants/snds'
import type { SndsTokenResponse } from '@/types/snds'

/**
 * Calls the Microsoft token endpoint for the SNDS client.
 *
 * The request must carry no `Origin` header: Microsoft treats one as a
 * browser redemption and refuses it for this client (AADSTS90023). Server
 * side `fetch` sends none, and none is added here.
 */
export async function postSndsTokenRequest(
  params: Readonly<Record<string, string>>,
): Promise<SndsTokenResponse> {
  const body = new URLSearchParams({
    client_id: SNDS_CLIENT_ID,
    scope: SNDS_SCOPE,
    ...params,
  })
  const res = await fetch(SNDS_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const json = (await res.json().catch(() => ({}))) as {
    access_token?: string
    refresh_token?: string
    error?: string
    error_description?: string
  }
  if (!res.ok || !json.access_token || !json.refresh_token) {
    const detail =
      json.error_description?.split('\n')[0] ??
      json.error ??
      `HTTP ${String(res.status)}`
    throw new Error(`Microsoft sign-in failed: ${detail}`)
  }
  return { accessToken: json.access_token, refreshToken: json.refresh_token }
}
