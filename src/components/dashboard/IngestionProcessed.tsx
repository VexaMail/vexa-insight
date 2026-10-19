import { countDelta, formatCount } from '@/utils/dashboard'
import { DeltaText } from './DeltaText'
import type { IngestionFactsProps } from './IngestionFactsProps'

/** Emails the latest run processed, against the run before it. */
export function IngestionProcessed({
  health,
}: Readonly<Pick<IngestionFactsProps, 'health'>>) {
  const delta = countDelta({
    current: health.lastRunProcessed,
    previous: health.previousRunProcessed,
  })
  return (
    <span className="flex flex-wrap items-center gap-x-2">
      <span title={`${formatCount(health.lastRunIngested)} reports ingested`}>
        {formatCount(health.lastRunProcessed)} emails
      </span>
      {delta ? (
        <span className="text-xs" title="vs the run before">
          <DeltaText value={delta} direction="neutral" /> vs previous run
        </span>
      ) : null}
    </span>
  )
}
