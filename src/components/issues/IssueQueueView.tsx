'use client'

import { Panel } from '@/components/ui'
import { useIssueFilters } from '@/hooks/issues'
import { ListChecks } from 'lucide-react'
import { IssueFilters } from './IssueFilters'
import { IssueQueueList } from './IssueQueueList'
import type { IssueQueueViewProps } from './IssueQueueViewProps'

/** The full issue queue with its filters, active issues first. */
export function IssueQueueView({
  issues,
  nowMs,
  windowLabel,
  impactLabel,
}: Readonly<IssueQueueViewProps>) {
  const filters = useIssueFilters(issues)
  return (
    <div className="space-y-4">
      <IssueFilters filters={filters} />
      <Panel
        flush
        icon={<ListChecks />}
        title="Issue queue"
        description={`${String(filters.visible.length)} of ${String(issues.length)} derived issues, ${windowLabel}. Impact counts messages in that period.`}
      >
        <IssueQueueList
          issues={filters.visible}
          nowMs={nowMs}
          impactLabel={impactLabel}
          emptyText="No issue matches these filters."
        />
      </Panel>
    </div>
  )
}
