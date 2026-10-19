import { StatusPill } from '@/components/ui'
import type { IngestHealthFactsProps } from '@/types/ingest'
import {
  countReachableMailboxes,
  describeAge,
  mailboxesVerdict,
  schedulerVerdict,
} from '@/utils/ingest'
import { IngestErrorsRow } from './IngestErrorsRow'
import { IngestFactRow } from './IngestFactRow'
import { IngestLastRunValue } from './IngestLastRunValue'
import { IngestVolumeRow } from './IngestVolumeRow'

/** Scheduler, last run, volume, mailboxes and errors, one row each. */
export function IngestHealthFacts({
  health,
  activity,
}: Readonly<IngestHealthFactsProps>) {
  const { runs, reports, mailboxes, now } = health
  const scheduler = schedulerVerdict(health)
  const mailboxState = mailboxesVerdict(mailboxes)
  return (
    <dl className="divide-border divide-y">
      <IngestFactRow
        label="Scheduler status"
        aside={
          health.nextRunAt
            ? `Next run ${describeAge(health.nextRunAt, now)}`
            : 'No run scheduled'
        }
      >
        <StatusPill tone={scheduler.tone} dot>
          {scheduler.label}
        </StatusPill>
      </IngestFactRow>
      <IngestFactRow
        label="Last run"
        aside={`${runs.lastProcessed.toLocaleString('en-US')} emails fetched`}
      >
        <IngestLastRunValue runs={runs} />
      </IngestFactRow>
      <IngestVolumeRow activity={activity} />
      <IngestFactRow
        label="Mailbox freshness"
        aside={`Last report ${describeAge(reports.lastIngestedAt, now)}`}
      >
        {mailboxes.length > 0 ? (
          <span className="tabular-nums">
            {`${String(countReachableMailboxes(mailboxes))} of ${String(mailboxes.length)} mailboxes`}
          </span>
        ) : null}
        <StatusPill tone={mailboxState.tone} dot>
          {mailboxState.label}
        </StatusPill>
      </IngestFactRow>
      <IngestErrorsRow health={health} activity={activity} />
    </dl>
  )
}
