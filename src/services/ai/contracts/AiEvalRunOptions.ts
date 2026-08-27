/**
 * Knobs for one harness invocation. `runs` is what makes prompt work useful:
 * the same prompt sent N times exposes the variance a single sample hides.
 *
 * No `temperature`: the harness only ever calls the subscription lane, and the
 * Claude 5 models it serves reject the parameter.
 */
export type AiEvalRunOptions = {
  model: string
  runs: number
  maxTokens: number
  timeoutMs: number
}
