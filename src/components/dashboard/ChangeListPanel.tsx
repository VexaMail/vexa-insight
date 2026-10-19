import { Panel } from '@/components/ui'
import { GitCompareArrows } from 'lucide-react'
import type { ChangeListPanelProps } from './ChangeListPanelProps'
import { ChangeListRow } from './ChangeListRow'

/** The current period against the period of the same length before it. */
export function ChangeListPanel({
  items,
  window,
  className,
}: Readonly<ChangeListPanelProps>) {
  const compared = window.previous
    ? `${window.label} against the ${String(window.lengthDays)} days before`
    : 'the all-time range has no earlier period to compare with'
  return (
    <Panel
      className={className ?? ''}
      flush
      icon={<GitCompareArrows />}
      title="What changed since the previous period"
      description={`Comparing ${compared}.`}
    >
      {items.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">
          {window.previous
            ? 'No change above the thresholds between the two periods.'
            : 'Pick a shorter range to compare periods.'}
        </p>
      ) : (
        <ul className="divide-border divide-y">
          {items.map((item) => (
            <ChangeListRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </Panel>
  )
}
