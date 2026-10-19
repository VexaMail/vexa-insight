import { StatusPill } from '@/components/ui'
import type { IngestLastRunValueProps } from '@/types/ingest'
import { formatUtcTime } from '@/utils/format'
import { Check, X } from 'lucide-react'

/** When the latest run started and whether it succeeded. */
export function IngestLastRunValue({
  runs,
}: Readonly<IngestLastRunValueProps>) {
  if (!runs.lastRunAt) return <span>Never</span>
  return (
    <span className="flex flex-wrap items-center gap-2">
      <span className="tabular-nums">{formatUtcTime(runs.lastRunAt)}</span>
      {runs.lastRunSuccess ? (
        <StatusPill tone="success" icon={<Check />}>
          Success
        </StatusPill>
      ) : (
        <StatusPill tone="danger" icon={<X />}>
          Failed
        </StatusPill>
      )}
    </span>
  )
}
