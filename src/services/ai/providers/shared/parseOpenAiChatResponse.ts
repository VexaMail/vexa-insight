import type {
  OpenAiChatCompletionResponse,
  ProviderRawResponse,
} from '../../contracts'

export function parseOpenAiChatResponse(
  json: OpenAiChatCompletionResponse,
  durationMs: number,
): ProviderRawResponse {
  return {
    content: json.choices[0]?.message.content ?? '',
    model: json.model,
    tokensUsed: json.usage?.total_tokens ?? null,
    durationMs,
  }
}
