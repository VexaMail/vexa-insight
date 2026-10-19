import { StatusPill } from '@/components/ui'
import type { IngestHealthFactsProps } from '@/types/ingest'
import { formatUtcTime } from '@/utils/format'
import { describeAge, freshnessVerdict } from '@/utils/ingest'
import { IngestFactGroup } from './IngestFactGroup'
import { IngestFactRow } from './IngestFactRow'
import { IngestVolumeRow } from './IngestVolumeRow'

/** How fresh the stored data is, whatever brought it in, and its volume. */
export function IngestDataFacts({
  health,
  activity,
}: Readonly<IngestHealthFactsProps>) {
  const { reports, now } = health
  const verdict = freshnessVerdict(reports, now)
  return (
    <IngestFactGroup title="Data freshness">
      <IngestFactRow
        label="Newest report"
        aside={`Period ends ${describeAge(reports.lastPeriodEnd, now)}`}
      >
        <span
          className="tabular-nums"
          title={formatUtcTime(reports.lastIngestedAt)}
        >
          {describeAge(reports.lastIngestedAt, now)}
        </span>
        <StatusPill tone={verdict.tone} dot>
          {verdict.label}
        </StatusPill>
      </IngestFactRow>
      <IngestVolumeRow activity={activity} />
    </IngestFactGroup>
  )
}
