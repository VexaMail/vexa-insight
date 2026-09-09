/** The fields of an OpenAI-compatible chat completion the adapters read. */
export type OpenAiChatCompletionResponse = {
  choices: { message: { content: string } }[]
  model: string
  usage?: { total_tokens: number }
}
