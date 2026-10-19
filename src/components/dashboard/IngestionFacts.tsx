import { formatAgo, formatDuration } from '@/utils/dashboard'
import { IngestionErrors } from './IngestionErrors'
import { IngestionFact } from './IngestionFact'
import type { IngestionFactsProps } from './IngestionFactsProps'
import { IngestionFreshness } from './IngestionFreshness'
import { IngestionLastRun } from './IngestionLastRun'
import { IngestionNextRun } from './IngestionNextRun'
import { IngestionProcessed } from './IngestionProcessed'
import { IngestionReportsTrend } from './IngestionReportsTrend'
import { IngestionStatePill } from './IngestionStatePill'

/** Scheduler, last run, processed, mailbox freshness and recent errors. */
export function IngestionFacts({
  health,
  nowMs,
  reportsTrend,
}: Readonly<IngestionFactsProps>) {
  return (
    <dl className="divide-border divide-y">
      <IngestionFact
        label="Scheduler status"
        aside={<IngestionNextRun health={health} nowMs={nowMs} />}
      >
        <IngestionStatePill state={health.state} />
      </IngestionFact>
      <IngestionFact
        label="Last run"
        aside={
          health.lastRunDurationMs === null
            ? null
            : formatDuration(health.lastRunDurationMs)
        }
      >
        <IngestionLastRun health={health} />
      </IngestionFact>
      <IngestionFact
        label="Processed"
        aside={<IngestionReportsTrend reportsTrend={reportsTrend} />}
      >
        <IngestionProcessed health={health} />
      </IngestionFact>
      <IngestionFact
        label="Mailbox freshness"
        aside={
          health.mailboxFreshAtMs === null
            ? 'No mail yet'
            : `Last mail ${formatAgo(health.mailboxFreshAtMs, nowMs)}`
        }
      >
        <IngestionFreshness health={health} />
      </IngestionFact>
      <IngestionFact label="Ingestion errors">
        <IngestionErrors health={health} />
      </IngestionFact>
    </dl>
  )
}
