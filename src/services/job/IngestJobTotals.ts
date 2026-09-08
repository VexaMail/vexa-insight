/** Mutable accumulator so a throw mid-run still reports partial progress. */
export type IngestJobTotals = {
  processed: number
  ingested: number
  skipped: number
  errors: string[]
}
