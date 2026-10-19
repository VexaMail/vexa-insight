/** How far the diagnostics index is through refreshing its stale rows. */
export type DiagnosticsOverviewProgress = {
  /** Domains that needed a check when the page opened. */
  readonly queued: number
  /** Of those, how many have been checked so far. */
  readonly done: number
  /** Set when a batch failed; the remaining domains are left as they were. */
  readonly error: string | null
}
