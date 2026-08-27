/**
 * The record of a single harness call. `parsed` holds whatever the production
 * parser returned, and `parseError` is set instead when the call or the parse
 * failed — a failed run is recorded rather than thrown, so one bad sample does
 * not discard the rest of the sweep.
 */
export type AiEvalRun = {
  run: number
  durationMs: number
  tokensUsed: number | null
  model: string
  content: string
  parsed: unknown
  parseError: string | null
}
