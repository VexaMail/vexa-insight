import { usesLegacyOpenAiChatParams } from '@/utils/ai'
import type {
  AIProviderAdapter,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'

/**
 * OpenAI-compatible chat completions adapter.
 *
 * The output cap and `temperature` are chosen together per model: the older
 * families take `max_tokens` plus a real `temperature`, while the reasoning
 * models take `max_completion_tokens` and reject any sampling parameter with
 * HTTP 400.
 */
export function createOpenAiAdapter(
  apiKey: string,
  model?: string | null,
): AIProviderAdapter {
  const resolvedModel = resolveEffectiveModel('openai', model)

  return {
    providerId: 'openai',

    async complete(
      systemPrompt: string,
      userPrompt: string,
      options: ProviderRequestOptions,
    ): Promise<ProviderRawResponse> {
      const start = Date.now()
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: resolvedModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            ...(usesLegacyOpenAiChatParams(resolvedModel)
              ? {
                  max_tokens: options.maxTokens,
                  temperature: options.temperature,
                }
              : { max_completion_tokens: options.maxTokens }),
            response_format: { type: 'json_object' },
          }),
          signal: AbortSignal.timeout(options.timeoutMs),
        },
      )
      const durationMs = Date.now() - start

      if (!response.ok) {
        throw mapProviderError('openai', response.status, await response.text())
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
