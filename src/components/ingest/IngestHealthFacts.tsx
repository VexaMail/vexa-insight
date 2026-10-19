import type { IngestHealthFactsProps } from '@/types/ingest'
import { IngestConfigFacts } from './IngestConfigFacts'
import { IngestDataFacts } from './IngestDataFacts'
import { IngestRunFacts } from './IngestRunFacts'

/**
 * The ingestion facts in three groups: the configuration in place now, what
 * the recorded runs did, and how fresh the stored data is.
 */
export function IngestHealthFacts({
  health,
  activity,
  canConfigure,
}: Readonly<IngestHealthFactsProps>) {
  return (
    <div>
      <IngestConfigFacts health={health} canConfigure={canConfigure} />
      <IngestRunFacts health={health} activity={activity} />
      <IngestDataFacts health={health} activity={activity} />
    </div>
  )
}
