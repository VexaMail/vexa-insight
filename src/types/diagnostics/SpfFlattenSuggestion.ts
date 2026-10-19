/** An include whose lookups would be saved by publishing its IP ranges. */
export type SpfFlattenSuggestion = {
  readonly domain: string
  /** The include itself plus every lookup below it. */
  readonly lookups: number
}
