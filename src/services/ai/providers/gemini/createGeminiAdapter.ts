import type {
  AIProviderAdapter,
  GeminiGenerateContentResponse,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { postJsonWithTiming } from '../shared/postJsonWithTiming'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'
import { buildGeminiGenerateContentBody } from './buildGeminiGenerateContentBody'
import { parseGeminiGenerateContentResponse } from './parseGeminiGenerateContentResponse'

/**
 * Google Gemini adapter using the generateContent REST API.
 */
export function createGeminiAdapter(
  apiKey: string,
  model?: string | null,
): AIProviderAdapter {
  const resolvedModel = resolveEffectiveModel('gemini', model)

  return {
    providerId: 'gemini',

    async complete(
      systemPrompt: string,
      userPrompt: string,
      options: ProviderRequestOptions,
    ): Promise<ProviderRawResponse> {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${apiKey}`
      const { response, durationMs } = await postJsonWithTiming(
        url,
        { 'Content-Type': 'application/json' },
        buildGeminiGenerateContentBody(
          resolvedModel,
          systemPrompt,
          userPrompt,
          options,
        ),
        options.timeoutMs,
      )
      if (!response.ok) {
        throw mapProviderError('gemini', response.status, await response.text())
      }
      const json = (await response.json()) as GeminiGenerateContentResponse
      return parseGeminiGenerateContentResponse(json, resolvedModel, durationMs)
    },
  }
}
