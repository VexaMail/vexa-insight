/**
 * Props for the crons section (schedule, last run, progress, Run now, Stop).
 */
export type CronsSectionProps = {
  readonly ingestionIntervalMinutes: number
  readonly initialApiKey?: string
  readonly isHistoricalJobContext?: boolean | undefined
  readonly jobId?: number | undefined
  /** The server-rendered job runs table to display in the tabs. */
  readonly jobRunsNode?: React.ReactNode
  /** The server-rendered processed emails table to display in the tabs. */
  readonly processedEmailsNode?: React.ReactNode
}
