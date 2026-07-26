import type {
  AiEvalCallParams,
  AnthropicMessagesRequest,
  ProviderRawResponse,
} from '../contracts'
import { applyMaxOAuthRequestShape } from '../maxOAuth/applyMaxOAuthRequestShape'
import { getMaxOAuthToken } from '../maxOAuth/getMaxOAuthToken'
import { maxOAuthRequestHeaders } from '../maxOAuth/maxOAuthRequestHeaders'
import { mapProviderError } from '../providers/shared/providerError'

/**
 * Sends one prompt to `/v1/messages` on the Claude Max subscription lane.
 *
 * Always OAuth — unlike the adapter this does not consult `LLM_BACKEND`,
 * because a harness run has no reason to ever touch the metered key. The
 * response is mapped to `ProviderRawResponse` so harness output and production
 * output are the same shape and can be compared directly.
 */
export async function callMaxOAuthLane(
  params: AiEvalCallParams,
): Promise<ProviderRawResponse> {
  const request: AnthropicMessagesRequest = {
    model: params.model,
    max_tokens: params.maxTokens,
    system: params.systemPrompt,
    messages: [{ role: 'user', content: params.userPrompt }],
  }

  const start = Date.now()
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      ...maxOAuthRequestHeaders(await getMaxOAuthToken()),
    },
    body: JSON.stringify(applyMaxOAuthRequestShape(request)),
    signal: AbortSignal.timeout(params.timeoutMs),
  })
  const durationMs = Date.now() - start

  if (!response.ok) {
    throw mapProviderError('anthropic', response.status, await response.text())
  }

  const json = (await response.json()) as {
    content: { type: string; text: string }[]
    model: string
    usage?: { input_tokens: number; output_tokens: number }
  }

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
