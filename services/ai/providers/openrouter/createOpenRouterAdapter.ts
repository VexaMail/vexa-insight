import type {
  AIProviderAdapter,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'

/**
 * OpenRouter adapter. Uses OpenAI-compatible chat completions endpoint.
 */
export function createOpenRouterAdapter(
  apiKey: string,
  model?: string | null,
): AIProviderAdapter {
  const resolvedModel = resolveEffectiveModel('openrouter', model)

  return {
    providerId: 'openrouter',

    async complete(
      systemPrompt: string,
      userPrompt: string,
      options: ProviderRequestOptions,
    ): Promise<ProviderRawResponse> {
      const start = Date.now()
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://vexa-insight.local',
            'X-Title': 'Vexa Insight Dashboard',
          },
          body: JSON.stringify({
            model: resolvedModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            max_tokens: options.maxTokens,
            temperature: options.temperature,
          }),
          signal: AbortSignal.timeout(options.timeoutMs),
        },
      )
      const durationMs = Date.now() - start

      if (!response.ok) {
        throw mapProviderError(
          'openrouter',
          response.status,
          await response.text(),
        )
      }

      const json = (await response.json()) as {
        choices: { message: { content: string } }[]
        model: string
        usage?: { total_tokens: number }
      }

      return {
        content: json.choices[0]?.message.content ?? '',
        model: json.model,
        tokensUsed: json.usage?.total_tokens ?? null,
        durationMs,
      }
    },
  }
}
