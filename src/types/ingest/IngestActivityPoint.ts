export type IngestActivityPoint = {
  /** Day of the run, as YYYY-MM-DD in UTC. */
  date: string
  /** Runs that finished without errors. */
  successfulRuns: number
  /** Runs that reported at least one error. */
  failedRuns: number
  /** Emails fetched from the mailboxes that day. */
  processed: number
  /** Reports actually stored that day. */
  ingested: number
  errors: number
}
