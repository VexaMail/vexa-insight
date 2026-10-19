import { Panel } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Activity, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { IngestionFacts } from './IngestionFacts'
import type { IngestionHealthPanelProps } from './IngestionHealthPanelProps'
import { IngestionStatePill } from './IngestionStatePill'
import { TriggerIngestButton } from './TriggerIngestButton'

/** Whether report collection is working, with a run-now action for admins. */
export function IngestionHealthPanel({
  health,
  nowMs,
  apiKey,
  className,
}: Readonly<IngestionHealthPanelProps>) {
  const disabledReason =
    health.state === 'running'
      ? 'A run is in progress.'
      : health.intervalMinutes === null
        ? 'Configure an IMAP account in Settings to fetch reports.'
        : null
  return (
    <Panel
      className={className ?? ''}
      icon={<Activity />}
      title="Ingestion health"
      actions={<IngestionStatePill state={health.state} />}
    >
      <div className="flex flex-col gap-4">
        <IngestionFacts health={health} nowMs={nowMs} />
        <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2">
          {apiKey ? (
            <TriggerIngestButton
              apiKey={apiKey}
              disabledReason={disabledReason}
            />
          ) : null}
          <Link
            href="/ingest"
            className={cn(
              'border-border text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
              !apiKey && 'sm:col-span-2',
            )}
          >
            View ingest
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Panel>
  )
}
