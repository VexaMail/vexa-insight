import type { IngestHealthFactsProps } from '@/types/ingest'
import { summarizeIngestActivity } from '@/utils/ingest'
import { IngestFactRow } from './IngestFactRow'

/** Errors of the latest run, and the failed runs across the window. */
export function IngestErrorsRow({
  health,
  activity,
}: Readonly<IngestHealthFactsProps>) {
  const { runs } = health
  const summary = summarizeIngestActivity(activity)
  return (
    <IngestFactRow
      label="Errors, last run"
      aside={`${summary.failedRuns.toLocaleString('en-US')} failed runs in ${String(summary.days)} days`}
    >
      <span className="tabular-nums">{runs.lastErrorCount}</span>
      <span
        className="text-muted-foreground min-w-0 truncate text-xs"
        title={runs.lastErrorSummary ?? undefined}
      >
        {runs.lastErrorSummary ?? 'in the last run'}
      </span>
    </IngestFactRow>
  )
}
