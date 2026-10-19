import { StatTile } from '@/components/ui'
import type { IngestKpiTilesProps } from '@/types/ingest'
import { summarizeIngestActivity } from '@/utils/ingest'
import { FileText, Mail, TriangleAlert } from 'lucide-react'
import { IngestFreshnessTile } from './IngestFreshnessTile'

/** Mail fetched, reports stored, failed runs and the age of the newest data. */
export function IngestKpiTiles({
  health,
  activity,
}: Readonly<IngestKpiTilesProps>) {
  const summary = summarizeIngestActivity(activity)
  const span = `last ${String(summary.days)} days`
  const { runs } = health
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        variant="feature"
        label="Emails processed"
        value={summary.processed.toLocaleString('en-US')}
        hint={`Fetched from the mailboxes, ${span}`}
        accent="info"
        icon={<Mail />}
        trend={summary.processedTrend}
        trendKind="bars"
      />
      <StatTile
        variant="feature"
        label="Reports ingested"
        value={summary.ingested.toLocaleString('en-US')}
        hint={`Stored as new reports, ${span}`}
        accent="info"
        icon={<FileText />}
        trend={summary.ingestedTrend}
      />
      <StatTile
        variant="feature"
        label="Failed runs, 24 h"
        value={String(runs.failedRuns24h)}
        hint={`Of ${String(runs.runs24h)} runs; ${summary.failedRuns.toLocaleString('en-US')} failed, ${span}`}
        tone={runs.failedRuns24h > 0 ? 'danger' : 'neutral'}
        accent={runs.failedRuns24h > 0 ? 'danger' : 'success'}
        icon={<TriangleAlert />}
        trend={summary.failedRunsTrend}
        trendKind="bars"
      />
      <IngestFreshnessTile health={health} />
    </div>
  )
}
