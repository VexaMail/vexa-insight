import { Panel } from '@/components/ui'
import type { IngestHealthProps } from '@/types/ingest'
import { HeartPulse } from 'lucide-react'
import { FreshnessHealthTile } from './FreshnessHealthTile'
import { MailboxHealthTile } from './MailboxHealthTile'
import { ProcessingHealthTile } from './ProcessingHealthTile'
import { SchedulerHealthTile } from './SchedulerHealthTile'

/** The four health checks, each with the facts behind its verdict. */
export function IngestHealthPanel({ health }: Readonly<IngestHealthProps>) {
  return (
    <Panel
      title="Health checks"
      description="Scheduler, mailboxes, processing and data freshness, checked separately: an idle engine is not proof of a healthy one."
      icon={<HeartPulse />}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SchedulerHealthTile health={health} />
        <MailboxHealthTile health={health} />
        <ProcessingHealthTile health={health} />
        <FreshnessHealthTile health={health} />
      </div>
    </Panel>
  )
}
