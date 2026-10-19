import { StatTile } from '@/components/ui'
import type { IngestHealthProps } from '@/types/ingest'
import { describeAge, freshnessVerdict } from '@/utils/ingest'
import { Hourglass } from 'lucide-react'

/** How long ago the newest report arrived, tinted by its freshness. */
export function IngestFreshnessTile({ health }: Readonly<IngestHealthProps>) {
  const { reports, now } = health
  return (
    <StatTile
      variant="feature"
      label="Newest report"
      value={describeAge(reports.lastIngestedAt, now)}
      hint={`Latest arrival · its period ends ${describeAge(reports.lastPeriodEnd, now)}`}
      accent={freshnessVerdict(reports, now).tone}
      icon={<Hourglass />}
    />
  )
}
