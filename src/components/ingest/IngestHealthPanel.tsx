import { Panel, StatusPill } from '@/components/ui'
import type { IngestHealthProps } from '@/types/ingest'
import { buildIngestVerdicts, overallIngestVerdict } from '@/utils/ingest'
import { HeartPulse } from 'lucide-react'
import { FreshnessHealthTile } from './FreshnessHealthTile'
import { MailboxHealthTile } from './MailboxHealthTile'
import { ProcessingHealthTile } from './ProcessingHealthTile'
import { SchedulerHealthTile } from './SchedulerHealthTile'

/** Four separate health checks and the one state they add up to. */
export function IngestHealthPanel({ health }: Readonly<IngestHealthProps>) {
  const overall = overallIngestVerdict(buildIngestVerdicts(health))
  return (
    <Panel
      title="Ingestion health"
      description="Scheduler, mailboxes, processing and data freshness, checked separately: an idle engine is not proof of a healthy one."
      icon={<HeartPulse />}
    >
      <p className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Overall</span>
        <StatusPill tone={overall.tone} dot>
          {overall.label}
        </StatusPill>
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SchedulerHealthTile health={health} />
        <MailboxHealthTile health={health} />
        <ProcessingHealthTile health={health} />
        <FreshnessHealthTile health={health} />
      </div>
    </Panel>
  )
}
