import { Panel, StatusPill } from '@/components/ui'
import { PHONE_QUEUE_LIMIT } from '@/constants/dashboard'
import { impactLabel } from '@/utils/dashboard'
import { BellRing } from 'lucide-react'
import { ActionQueueGroup } from './ActionQueueGroup'
import type { ActionQueuePanelProps } from './ActionQueuePanelProps'
import { ActionQueuePhoneFooter } from './ActionQueuePhoneFooter'
import { ViewAllLink } from './ViewAllLink'

/** Active issues, new or regressed first, each linking to its evidence. */
export function ActionQueuePanel({
  items,
  parked,
  window,
  nowMs,
  className,
}: Readonly<ActionQueuePanelProps>) {
  const fresh = items.filter((i) => i.isNew)
  const standing = items.filter((i) => !i.isNew)
  const parkedNote =
    parked > 0
      ? ` ${String(parked)} acknowledged or snoozed ${parked === 1 ? 'issue is' : 'issues are'} on the Issues page.`
      : ''
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
      description={`High-priority issues that need your attention, ${window.label}.${parkedNote}`}
      actions={<ViewAllLink href="/issues" label="View all issues" />}
    >
      <ActionQueueGroup
        title="New or regressed"
        items={fresh}
        nowMs={nowMs}
        impactLabel={impactLabel(window)}
        emptyText="Nothing new or worse than in the previous period."
        phoneLimit={PHONE_QUEUE_LIMIT}
      />
      <ActionQueueGroup
        title="Long-standing"
        items={standing}
        nowMs={nowMs}
        impactLabel={impactLabel(window)}
        emptyText="No long-standing issues."
        phoneLimit={Math.max(0, PHONE_QUEUE_LIMIT - fresh.length)}
      />
      <ActionQueuePhoneFooter total={items.length} />
    </Panel>
  )
}
