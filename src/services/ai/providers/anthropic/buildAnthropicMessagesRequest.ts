import { supportsAnthropicTemperature } from '@/utils/ai'
import type {
  AnthropicMessagesRequest,
  ProviderRequestOptions,
} from '../../contracts'

/** `temperature` only goes to the model generations that still accept it. */
export function buildAnthropicMessagesRequest(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  options: ProviderRequestOptions,
): AnthropicMessagesRequest {
  return {
    model,
    max_tokens: options.maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    ...(supportsAnthropicTemperature(model)
      ? { temperature: options.temperature }
      : {}),
  }
}
