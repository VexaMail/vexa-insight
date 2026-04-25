import type {
  AIProviderAdapter,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'

/**
 * Anthropic (Claude) messages API adapter.
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
      const start = Date.now()
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: resolvedModel,
          max_tokens: options.maxTokens,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
          temperature: options.temperature,
        }),
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
