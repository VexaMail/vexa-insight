import type {
  AIProviderAdapter,
  OpenAiChatCompletionResponse,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { parseOpenAiChatResponse } from '../shared/parseOpenAiChatResponse'
import { postJsonWithTiming } from '../shared/postJsonWithTiming'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'
import { buildOpenAiChatBody } from './buildOpenAiChatBody'

/**
 * OpenAI-compatible chat completions adapter. The per-model request shape is
 * decided in `buildOpenAiChatBody`.
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
      const { response, durationMs } = await postJsonWithTiming(
        'https://api.openai.com/v1/chat/completions',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        buildOpenAiChatBody(resolvedModel, systemPrompt, userPrompt, options),
        options.timeoutMs,
      )
      if (!response.ok) {
        throw mapProviderError('openai', response.status, await response.text())
      }
      const json = (await response.json()) as OpenAiChatCompletionResponse
      return parseOpenAiChatResponse(json, durationMs)
    },
  }
}
