import type { IngestHealthProps } from '@/types/ingest'
import {
  describeAge,
  formatHealthTime,
  processingVerdict,
} from '@/utils/ingest'
import { Cog } from 'lucide-react'
import { HealthFact } from './HealthFact'
import { HealthTile } from './HealthTile'

/** What the last run did, and how many runs of the last day failed. */
export function ProcessingHealthTile({ health }: Readonly<IngestHealthProps>) {
  const { runs, now } = health
  return (
    <HealthTile
      title="Processing"
      icon={<Cog />}
      verdict={processingVerdict(runs)}
    >
      <HealthFact label="Last run" title={formatHealthTime(runs.lastRunAt)}>
        {describeAge(runs.lastRunAt, now)}
      </HealthFact>
      <HealthFact label="Processed / ingested">
        {`${runs.lastProcessed.toLocaleString('en-US')} / ${runs.lastIngested.toLocaleString('en-US')}`}
      </HealthFact>
      <HealthFact
        label="Errors, last run"
        title={runs.lastErrorSummary ?? undefined}
      >
        {runs.lastErrorCount.toLocaleString('en-US')}
      </HealthFact>
      <HealthFact label="Failed runs, 24 h">
        {`${String(runs.failedRuns24h)} of ${String(runs.runs24h)}`}
      </HealthFact>
      <HealthFact
        label="Last success"
        title={formatHealthTime(runs.lastSuccessAt)}
      >
        {describeAge(runs.lastSuccessAt, now)}
      </HealthFact>
    </HealthTile>
  )
}
