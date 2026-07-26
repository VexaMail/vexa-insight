import { supportsAnthropicTemperature } from '@/utils/ai'
import type {
  AIProviderAdapter,
  AnthropicMessagesRequest,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { applyMaxOAuthRequestShape } from '../../maxOAuth/applyMaxOAuthRequestShape'
import { buildAnthropicAuthHeaders } from '../../maxOAuth/buildAnthropicAuthHeaders'
import { isMaxOAuthBackendEnabled } from '../../maxOAuth/isMaxOAuthBackendEnabled'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'

/**
 * Anthropic (Claude) messages API adapter.
 *
 * Auth and request shape are chosen per call: the metered API key by default,
 * or the Claude Max subscription OAuth token when the dev-only `max-oauth`
 * backend is on. See `services/ai/maxOAuth`.
 *
 * `temperature` is only sent to the model generations that still accept it;
 * newer ones reject the field with HTTP 400.
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
      const request: AnthropicMessagesRequest = {
        model: resolvedModel,
        max_tokens: options.maxTokens,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
        ...(supportsAnthropicTemperature(resolvedModel)
          ? { temperature: options.temperature }
          : {}),
      }

      const start = Date.now()
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          ...(await buildAnthropicAuthHeaders(apiKey)),
        },
        body: JSON.stringify(
          isMaxOAuthBackendEnabled()
            ? applyMaxOAuthRequestShape(request)
            : request,
        ),
        signal: AbortSignal.timeout(options.timeoutMs),
      })
      const durationMs = Date.now() - start

      if (!response.ok) {
        throw mapProviderError(
          'anthropic',
          response.status,
          await response.text(),
        )
      }

      const json = (await response.json()) as {
        content: { type: string; text: string }[]
        model: string
        usage?: { input_tokens: number; output_tokens: number }
      }

      const textBlock = json.content.find((c) => c.type === 'text')

      return {
        content: textBlock?.text ?? '',
        model: json.model,
        tokensUsed: json.usage
          ? json.usage.input_tokens + json.usage.output_tokens
          : null,
        durationMs,
      }
    },
  }
}
