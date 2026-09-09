import type {
  AIProviderAdapter,
  OpenAiChatCompletionResponse,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { buildChatMessages } from '../shared/buildChatMessages'
import { parseOpenAiChatResponse } from '../shared/parseOpenAiChatResponse'
import { postJsonWithTiming } from '../shared/postJsonWithTiming'
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
      const { response, durationMs } = await postJsonWithTiming(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://vexa-insight.local',
          'X-Title': 'Vexa Insight Dashboard',
        },
        {
          model: resolvedModel,
          messages: buildChatMessages(systemPrompt, userPrompt),
          max_tokens: options.maxTokens,
          temperature: options.temperature,
        },
        options.timeoutMs,
      )
      if (!response.ok) {
        throw mapProviderError(
          'openrouter',
          response.status,
          await response.text(),
        )
      }
      const json = (await response.json()) as OpenAiChatCompletionResponse
      return parseOpenAiChatResponse(json, durationMs)
    },
  }
}
