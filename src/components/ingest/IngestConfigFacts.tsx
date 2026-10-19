import { StatusPill } from '@/components/ui'
import type { IngestHealthFactsProps } from '@/types/ingest'
import { describeAge, schedulerVerdict } from '@/utils/ingest'
import { IngestFactGroup } from './IngestFactGroup'
import { IngestFactRow } from './IngestFactRow'
import { IngestMailboxesRow } from './IngestMailboxesRow'

/** What is set up right now: the scheduler and the mailboxes it polls. */
export function IngestConfigFacts({
  health,
  canConfigure,
}: Readonly<Omit<IngestHealthFactsProps, 'activity'>>) {
  const scheduler = schedulerVerdict(health)
  return (
    <IngestFactGroup title="Current configuration">
      <IngestFactRow
        label="Scheduler"
        aside={
          health.nextRunAt
            ? `Next run ${describeAge(health.nextRunAt, health.now)}`
            : 'No run scheduled'
        }
      >
        <StatusPill tone={scheduler.tone} dot>
          {scheduler.label}
        </StatusPill>
      </IngestFactRow>
      <IngestMailboxesRow health={health} canConfigure={canConfigure} />
    </IngestFactGroup>
  )
}
