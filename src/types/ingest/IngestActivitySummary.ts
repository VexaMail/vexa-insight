/** Totals and daily series of the ingest activity window. */
export type IngestActivitySummary = {
  /** Days the window covers. */
  readonly days: number
  readonly processed: number
  readonly ingested: number
  readonly failedRuns: number
  readonly processedTrend: readonly number[]
  readonly ingestedTrend: readonly number[]
  readonly failedRunsTrend: readonly number[]
}
