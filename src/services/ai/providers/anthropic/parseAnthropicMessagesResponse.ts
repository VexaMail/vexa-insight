import type {
  AnthropicMessagesResponse,
  ProviderRawResponse,
} from '../../contracts'

export function parseAnthropicMessagesResponse(
  json: AnthropicMessagesResponse,
  durationMs: number,
): ProviderRawResponse {
  const textBlock = json.content.find((c) => c.type === 'text')
  return {
    content: textBlock?.text ?? '',
    model: json.model,
    tokensUsed: json.usage
      ? json.usage.input_tokens + json.usage.output_tokens
      : null,
    durationMs,
  }
}
