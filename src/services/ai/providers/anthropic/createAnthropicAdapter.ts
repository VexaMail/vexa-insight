import type {
  AIProviderAdapter,
  AnthropicMessagesResponse,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { applyMaxOAuthRequestShape } from '../../maxOAuth/applyMaxOAuthRequestShape'
import { buildAnthropicAuthHeaders } from '../../maxOAuth/buildAnthropicAuthHeaders'
import { isMaxOAuthBackendEnabled } from '../../maxOAuth/isMaxOAuthBackendEnabled'
import { postJsonWithTiming } from '../shared/postJsonWithTiming'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'
import { buildAnthropicMessagesRequest } from './buildAnthropicMessagesRequest'
import { parseAnthropicMessagesResponse } from './parseAnthropicMessagesResponse'

/**
 * Anthropic (Claude) messages API adapter.
 *
 * Auth and request shape are chosen per call: the metered API key by default,
 * or the Claude Max subscription OAuth token when the dev-only `max-oauth`
 * backend is on. See `services/ai/maxOAuth`.
 */
export function createAnthropicAdapter(
  apiKey: string,
  model?: string | null,
): AIProviderAdapter {
  const resolvedModel = resolveEffectiveModel('anthropic', model)

  return {
    providerId: 'anthropic',

    async complete(
      systemPrompt: string,
      userPrompt: string,
      options: ProviderRequestOptions,
    ): Promise<ProviderRawResponse> {
      const request = buildAnthropicMessagesRequest(
        resolvedModel,
        systemPrompt,
        userPrompt,
        options,
      )
      const { response, durationMs } = await postJsonWithTiming(
        'https://api.anthropic.com/v1/messages',
        {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          ...(await buildAnthropicAuthHeaders(apiKey)),
        },
        isMaxOAuthBackendEnabled()
          ? applyMaxOAuthRequestShape(request)
          : request,
        options.timeoutMs,
      )
      if (!response.ok) {
        throw mapProviderError(
          'anthropic',
          response.status,
          await response.text(),
        )
      }
      const json = (await response.json()) as AnthropicMessagesResponse
      return parseAnthropicMessagesResponse(json, durationMs)
    },
  }
}
