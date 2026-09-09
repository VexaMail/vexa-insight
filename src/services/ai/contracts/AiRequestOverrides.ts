/** The per-call knobs a use case may pass through to the provider. */
export type AiRequestOverrides = {
  readonly timeoutMs?: number | undefined
  readonly maxTokens?: number | undefined
  readonly temperature?: number | undefined
}
