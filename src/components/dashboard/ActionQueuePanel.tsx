import { Panel, StatusPill } from '@/components/ui'
import { BellRing } from 'lucide-react'
import { ActionQueueGroup } from './ActionQueueGroup'
import type { ActionQueuePanelProps } from './ActionQueuePanelProps'
import { ViewAllLink } from './ViewAllLink'

/** What needs a look, new or regressed items first, each linking to its cause. */
export function ActionQueuePanel({
  items,
  window,
  className,
}: Readonly<ActionQueuePanelProps>) {
  const fresh = items.filter((i) => i.isNew)
  const standing = items.filter((i) => !i.isNew)
  return (
    <Panel
      className={className ?? ''}
      flush
      icon={<BellRing />}
      title={
        <span className="flex items-center gap-2">
          Action required
          {fresh.length > 0 ? (
            <StatusPill tone="danger">{fresh.length} new</StatusPill>
          ) : null}
        </span>
      }
      description={`Derived from report data and ingestion runs, ${window.label}. Impact counts messages in that period.`}
      actions={<ViewAllLink href="/domains" label="All domains" />}
    >
      <ActionQueueGroup
        title="New or regressed"
        items={fresh}
        emptyText="Nothing new or worse than in the previous period."
      />
      <ActionQueueGroup
        title="Long-standing"
        items={standing}
        emptyText="No long-standing issues."
      />
    </Panel>
  )
}
