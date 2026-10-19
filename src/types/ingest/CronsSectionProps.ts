import type { ReactNode } from 'react'

/**
 * Props for the crons section (health facts, progress, Run now, Stop, tabs).
 */
export type CronsSectionProps = {
  readonly ingestionIntervalMinutes: number
  readonly initialApiKey?: string
  readonly isHistoricalJobContext?: boolean | undefined
  readonly jobId?: number | undefined
  /** The server-rendered overall health pill of the health panel. */
  readonly healthPill?: ReactNode
  /** The server-rendered facts of the health panel. */
  readonly healthFacts?: ReactNode
  /** The server-rendered health checks, between the panel and the tabs. */
  readonly healthChecks?: ReactNode
  /** The server-rendered job runs table to display in the tabs. */
  readonly jobRunsNode?: ReactNode
  /** The server-rendered processed emails table to display in the tabs. */
  readonly processedEmailsNode?: ReactNode
  /** Shown instead of run now and rescan while idle. */
  readonly idleAction?: ReactNode
}
