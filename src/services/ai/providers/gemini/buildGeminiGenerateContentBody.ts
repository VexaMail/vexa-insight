import { supportsGeminiTemperature } from '@/utils/ai'
import type { ProviderRequestOptions } from '../../contracts'

/**
 * `temperature` is only sent to the pre-3 families: Gemini 3 accepts the
 * field but its guide warns that overriding the default 1.0 can loop or
 * degrade reasoning output, so those models get the provider default.
 */
export function buildGeminiGenerateContentBody(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  options: ProviderRequestOptions,
) {
  return {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ parts: [{ text: userPrompt }] }],
    generationConfig: {
      maxOutputTokens: options.maxTokens,
      ...(supportsGeminiTemperature(model)
        ? { temperature: options.temperature }
        : {}),
      responseMimeType: 'application/json',
    },
  }
}
