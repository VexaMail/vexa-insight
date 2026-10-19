import { StatusPill } from '@/components/ui'
import { formatDateTime } from '@/utils/dashboard'
import { Check, X } from 'lucide-react'
import type { IngestionLastRunProps } from './IngestionLastRunProps'

/** When the latest run started and whether it succeeded. */
export function IngestionLastRun({ health }: Readonly<IngestionLastRunProps>) {
  if (health.lastRunAtMs === null) return <span>Never</span>
  return (
    <span className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[13px]">
        {formatDateTime(health.lastRunAtMs)}
      </span>
      {health.lastRunSuccess ? (
        <StatusPill tone="success" icon={<Check />}>
          Success
        </StatusPill>
      ) : (
        <StatusPill
          tone="danger"
          icon={<X />}
          title={health.lastRunError ?? 'The run ended with errors.'}
        >
          Failed
        </StatusPill>
      )}
    </span>
  )
}
