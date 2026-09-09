export type UseCronsSectionParams = {
  readonly ingestionIntervalMinutes: number
  readonly initialApiKey: string
  readonly isHistoricalJobContext: boolean
  readonly jobId: number | undefined
}
