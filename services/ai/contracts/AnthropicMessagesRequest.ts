/**
 * The Anthropic `/v1/messages` request body this codebase sends. Narrower than
 * the API's full surface on purpose: it covers exactly the fields the Anthropic
 * adapter and the eval lane set, so a shape change fails type-check instead of
 * failing at the API.
 */
export type AnthropicMessagesRequest = {
  model: string
  max_tokens: number
  system: string | { type: 'text'; text: string }[]
  messages: { role: 'user'; content: string }[]
  /** Rejected by the Claude 5 models, which deprecated it. */
  temperature?: number
  thinking?: { type: 'disabled' }
}
