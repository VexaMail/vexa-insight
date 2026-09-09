import { usesLegacyOpenAiChatParams } from '@/utils/ai'
import type { ProviderRequestOptions } from '../../contracts'
import { buildChatMessages } from '../shared/buildChatMessages'

/**
 * The output cap, `temperature` and `response_format` are chosen together per
 * model: the older families take `max_tokens`, a real `temperature` and JSON
 * mode (`response_format: json_object`), while the reasoning models take
 * `max_completion_tokens` and reject sampling parameters and JSON mode with
 * HTTP 400 on chat completions (OpenAI support, confirmed by the o4-mini
 * structured-output community thread: response formats are "not compatible
 * with these models"; they are steered to the Responses API instead). The
 * prompts already demand raw JSON and the parser strips fences, so omitting
 * JSON mode keeps reasoning models usable without changing parsing.
 */
export function buildOpenAiChatBody(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  options: ProviderRequestOptions,
) {
  return {
    model,
    messages: buildChatMessages(systemPrompt, userPrompt),
    ...(usesLegacyOpenAiChatParams(model)
      ? {
          max_tokens: options.maxTokens,
          temperature: options.temperature,
          response_format: { type: 'json_object' },
        }
      : { max_completion_tokens: options.maxTokens }),
  }
}
