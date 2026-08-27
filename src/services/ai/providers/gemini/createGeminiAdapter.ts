import { supportsGeminiTemperature } from '@/utils/ai'
import type {
  AIProviderAdapter,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../../contracts'
import { mapProviderError } from '../shared/providerError'
import { resolveEffectiveModel } from '../shared/resolveEffectiveModel'

/**
 * Google Gemini adapter using the generateContent REST API.
 *
 * `temperature` is only sent to the pre-3 families: Gemini 3 accepts the
 * field but its guide warns that overriding the default 1.0 can loop or
 * degrade reasoning output, so those models get the provider default.
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
      const start = Date.now()
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${apiKey}`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: {
            maxOutputTokens: options.maxTokens,
            ...(supportsGeminiTemperature(resolvedModel)
              ? { temperature: options.temperature }
              : {}),
            responseMimeType: 'application/json',
          },
        }),
        signal: AbortSignal.timeout(options.timeoutMs),
      })
      const durationMs = Date.now() - start

      if (!response.ok) {
        throw mapProviderError('gemini', response.status, await response.text())
      }

      const json = (await response.json()) as {
        candidates: { content: { parts: { text: string }[] } }[]
        modelVersion?: string
        usageMetadata?: {
          promptTokenCount: number
          candidatesTokenCount: number
          totalTokenCount: number
        }
      }

      const text = json.candidates[0]?.content.parts[0]?.text ?? ''

      return {
        content: text,
        model: json.modelVersion ?? resolvedModel,
        tokensUsed: json.usageMetadata?.totalTokenCount ?? null,
        durationMs,
      }
    },
  }
}
