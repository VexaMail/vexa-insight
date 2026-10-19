import { Panel } from '@/components/ui'
import { Database } from 'lucide-react'
import { IngestionFacts } from './IngestionFacts'
import type { IngestionHealthPanelProps } from './IngestionHealthPanelProps'
import { TriggerIngestButton } from './TriggerIngestButton'
import { ViewAllLink } from './ViewAllLink'

/** Whether report collection is working, with a run-now action for admins. */
export function IngestionHealthPanel({
  health,
  nowMs,
  reportsTrend,
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
      flush
      icon={<Database />}
      title="Ingestion health"
      description="Scheduled ingestion and mailbox processing."
      actions={<ViewAllLink href="/ingest" label="View ingestion" />}
    >
      <IngestionFacts
        health={health}
        nowMs={nowMs}
        reportsTrend={reportsTrend}
      />
      {apiKey ? (
        <div className="border-border border-t p-4">
          <TriggerIngestButton
            apiKey={apiKey}
            disabledReason={disabledReason}
          />
        </div>
      ) : null}
    </Panel>
  )
}
