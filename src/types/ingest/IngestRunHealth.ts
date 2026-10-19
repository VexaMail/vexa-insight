/** The latest ingest runs, as the Processing tile reads them. */
export type IngestRunHealth = {
  readonly lastRunAt: Date | null
  readonly lastRunSuccess: boolean | null
  readonly lastProcessed: number
  readonly lastIngested: number
  readonly lastErrorCount: number
  readonly lastErrorSummary: string | null
  readonly lastSuccessAt: Date | null
  /** Runs in the last 24 hours that ended unsuccessfully. */
  readonly failedRuns24h: number
  readonly runs24h: number
}
