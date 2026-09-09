import type {
  GeminiGenerateContentResponse,
  ProviderRawResponse,
} from '../../contracts'

export function parseGeminiGenerateContentResponse(
  json: GeminiGenerateContentResponse,
  fallbackModel: string,
  durationMs: number,
): ProviderRawResponse {
  return {
    content: json.candidates[0]?.content.parts[0]?.text ?? '',
    model: json.modelVersion ?? fallbackModel,
    tokensUsed: json.usageMetadata?.totalTokenCount ?? null,
    durationMs,
  }
}
