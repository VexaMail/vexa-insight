/** One `/v1/messages` call issued by the offline prompt-eval harness. */
export type AiEvalCallParams = {
  model: string
  systemPrompt: string
  userPrompt: string
  maxTokens: number
  timeoutMs: number
}
