/** The fields of an Anthropic `/v1/messages` reply the adapter reads. */
export type AnthropicMessagesResponse = {
  content: { type: string; text: string }[]
  model: string
  usage?: { input_tokens: number; output_tokens: number }
}
