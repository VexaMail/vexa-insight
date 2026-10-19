import { Sparkline } from '@/components/ui'
import type { IngestActivityRowProps } from '@/types/ingest'
import { summarizeIngestActivity } from '@/utils/ingest'
import { IngestFactRow } from './IngestFactRow'

/** Reports stored over the activity window, with one bar per day. */
export function IngestVolumeRow({
  activity,
}: Readonly<IngestActivityRowProps>) {
  const summary = summarizeIngestActivity(activity)
  const span = `last ${String(summary.days)} days`
  return (
    <IngestFactRow
      label="Reports processed"
      aside={
        <Sparkline
          values={summary.ingestedTrend}
          kind="bars"
          tone="info"
          className="h-6 w-32 lg:ml-auto"
          label={`Reports ingested per day, ${span}`}
        />
      }
    >
      <span className="font-medium tabular-nums">
        {summary.ingested.toLocaleString('en-US')}
      </span>
      <span className="text-muted-foreground text-xs">{span}</span>
    </IngestFactRow>
  )
}
