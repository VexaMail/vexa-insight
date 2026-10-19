import { StatusPill } from '@/components/ui'
import type { IngestHealthProps } from '@/types/ingest'
import { buildIngestVerdicts, overallIngestVerdict } from '@/utils/ingest'

/** The one state the four checks add up to, its reason on hover. */
export function IngestOverallPill({ health }: Readonly<IngestHealthProps>) {
  const overall = overallIngestVerdict(buildIngestVerdicts(health))
  const [headline] = overall.label.split(':')
  return (
    <StatusPill tone={overall.tone} dot title={overall.label}>
      {headline ?? overall.label}
    </StatusPill>
  )
}
