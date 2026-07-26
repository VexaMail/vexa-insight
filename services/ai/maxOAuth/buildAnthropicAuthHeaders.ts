import { getMaxOAuthToken } from './getMaxOAuthToken'
import { isMaxOAuthBackendEnabled } from './isMaxOAuthBackendEnabled'
import { maxOAuthRequestHeaders } from './maxOAuthRequestHeaders'

/**
 * Chooses the Anthropic auth headers. Default is the metered `x-api-key`; when
 * the dev-only Max backend is on the call carries the subscription bearer
 * instead, so `/v1/messages` bills the flat Max quota and the configured key is
 * never sent.
 */
export async function buildAnthropicAuthHeaders(
  apiKey: string,
): Promise<Record<string, string>> {
  if (!isMaxOAuthBackendEnabled()) {
    return { 'x-api-key': apiKey }
  }
  return maxOAuthRequestHeaders(await getMaxOAuthToken())
}
