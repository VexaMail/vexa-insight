import { countDelta, formatCount, formatDateTime } from '@/utils/dashboard'
import { DeltaText } from './DeltaText'
import { IngestionFact } from './IngestionFact'
import type { IngestionFactsProps } from './IngestionFactsProps'
import { IngestionFreshness } from './IngestionFreshness'
import { IngestionLastRun } from './IngestionLastRun'
import { IngestionNextRun } from './IngestionNextRun'

/** Scheduler, last run, processed, next run and mailbox freshness. */
export function IngestionFacts({
  health,
  nowMs,
}: Readonly<IngestionFactsProps>) {
  const delta = countDelta({
    current: health.lastRunProcessed,
    previous: health.previousRunProcessed,
  })
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
        <span className="flex flex-wrap items-center gap-x-2">
          <span
            title={`${formatCount(health.lastRunIngested)} reports ingested`}
          >
            {formatCount(health.lastRunProcessed)} emails
          </span>
          {delta ? (
            <span className="text-xs" title="vs the run before">
              <DeltaText value={delta} direction="neutral" />
            </span>
          ) : null}
        </span>
      </IngestionFact>
      <IngestionFact label="Next run">
        <IngestionNextRun health={health} nowMs={nowMs} />
      </IngestionFact>
      <IngestionFact label="Mailbox freshness">
        <IngestionFreshness health={health} nowMs={nowMs} />
      </IngestionFact>
      {health.lastRunSuccess === false && health.lastSuccessAtMs !== null ? (
        <IngestionFact label="Last success">
          <span className="font-mono text-[13px]">
            {formatDateTime(health.lastSuccessAtMs)}
          </span>
        </IngestionFact>
      ) : null}
    </dl>
  )
}
