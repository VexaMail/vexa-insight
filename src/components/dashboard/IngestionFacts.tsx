import {
  formatCount,
  formatDateTime,
  formatRelativeMinutes,
} from '@/utils/dashboard'
import { DAY_SECONDS, toIsoDayFromUnixSeconds } from '@/utils/dates'
import { IngestionFact } from './IngestionFact'
import type { IngestionFactsProps } from './IngestionFactsProps'
import { IngestionLastRun } from './IngestionLastRun'

/** Scheduler, last run, processed, last success, next run and data freshness. */
export function IngestionFacts({
  health,
  nowMs,
}: Readonly<IngestionFactsProps>) {
  const newest =
    health.newestReportDay === null
      ? 'No reports yet'
      : toIsoDayFromUnixSeconds(health.newestReportDay * DAY_SECONDS)
  return (
    <dl className="divide-border divide-y">
      <IngestionFact label="Scheduler">
        {health.intervalMinutes === null
          ? 'Not scheduled (no IMAP account)'
          : `Every ${String(health.intervalMinutes)} minutes`}
      </IngestionFact>
      <IngestionFact label="Last run">
        <IngestionLastRun health={health} />
      </IngestionFact>
      <IngestionFact label="Processed">
        {`${formatCount(health.lastRunProcessed)} emails, ${formatCount(health.lastRunIngested)} reports ingested`}
      </IngestionFact>
      <IngestionFact label="Last success">
        <span className="font-mono text-[13px]">
          {health.lastSuccessAtMs === null
            ? 'Never'
            : formatDateTime(health.lastSuccessAtMs)}
        </span>
      </IngestionFact>
      <IngestionFact label="Next run">
        {health.nextRunAtMs === null
          ? '—'
          : `${formatRelativeMinutes(health.nextRunAtMs, nowMs)} (${formatDateTime(health.nextRunAtMs)})`}
      </IngestionFact>
      <IngestionFact label="Newest data">
        <span className="font-mono text-[13px]">{newest}</span>
      </IngestionFact>
    </dl>
  )
}
