import type { IngestHealthFactsProps } from '@/types/ingest'
import { formatUtcTime } from '@/utils/format'
import { describeAge, runHistoryNote } from '@/utils/ingest'
import { IngestErrorsRow } from './IngestErrorsRow'
import { IngestFactGroup } from './IngestFactGroup'
import { IngestFactRow } from './IngestFactRow'
import { IngestLastRunValue } from './IngestLastRunValue'

/** What the recorded runs did: the latest, the last clean one, its errors. */
export function IngestRunFacts({
  health,
  activity,
}: Readonly<IngestHealthFactsProps>) {
  const { runs, now } = health
  return (
    <IngestFactGroup title="Runs" note={runHistoryNote(health)}>
      <IngestFactRow
        label="Last run"
        aside={`${runs.lastProcessed.toLocaleString('en-US')} emails fetched`}
      >
        <IngestLastRunValue runs={runs} />
      </IngestFactRow>
      <IngestFactRow label="Last successful run">
        <span
          className="tabular-nums"
          title={formatUtcTime(runs.lastSuccessAt)}
        >
          {describeAge(runs.lastSuccessAt, now)}
        </span>
      </IngestFactRow>
      <IngestErrorsRow health={health} activity={activity} />
    </IngestFactGroup>
  )
}
