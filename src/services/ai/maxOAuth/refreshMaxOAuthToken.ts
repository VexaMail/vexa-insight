/**
 * Fallback only: mints a fresh access token from a stored refresh token via the
 * Claude Code OAuth token endpoint. Used when the Keychain token is already
 * expired — normally Claude Code keeps it refreshed and this never runs.
 *
 * The response payload is validated before use so a malformed body fails loudly
 * here instead of sending `Authorization: Bearer undefined` downstream.
 */
export async function refreshMaxOAuthToken(
  refreshToken: string,
): Promise<string> {
  const oauthTokenEndpoint = 'https://console.anthropic.com/v1/oauth/token'
  const claudeCodeClientId = '9d1c250a-e61b-44d9-88ed-5944d1962f5e'

  const response = await fetch(oauthTokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: claudeCodeClientId,
    }),
  })
  if (!response.ok) {
    throw new Error(
      `OAuth refresh failed with status ${String(response.status)}`,
    )
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    throw new Error('OAuth refresh returned a non-JSON body')
  }

  const payload = data as { access_token?: unknown }
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof payload.access_token !== 'string' ||
    payload.access_token.length === 0
  ) {
    throw new Error('OAuth refresh returned no usable access_token')
  }
  return payload.access_token
}
