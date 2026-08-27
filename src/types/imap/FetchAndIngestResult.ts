/**
 * Result of runFetchAndIngest: counts and error messages.
 */
export type FetchAndIngestResult = {
  errors: string[]
  ingested: number
  processed: number
  skipped: number
}
