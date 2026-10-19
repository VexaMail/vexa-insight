import { Panel } from '@/components/ui'
import { CHANGE_ROW_GRID } from '@/constants/dashboard'
import { Activity } from 'lucide-react'
import type { ChangeListPanelProps } from './ChangeListPanelProps'
import { ChangeListRow } from './ChangeListRow'
import { RankedHeader } from './RankedHeader'

/** The current period against the period of the same length before it. */
export function ChangeListPanel({
  items,
  window,
  nowMs,
  className,
}: Readonly<ChangeListPanelProps>) {
  const compared = window.previous
    ? `${window.label} against the ${String(window.lengthDays)} days before`
    : 'the all-time range has no earlier period to compare with'
  return (
    <Panel
      className={className ?? ''}
      flush
      icon={<Activity />}
      title="What changed since the previous period"
      description={`Notable changes: ${compared}.`}
    >
      {items.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">
          {window.previous
            ? 'No change above the thresholds between the two periods.'
            : 'Pick a shorter range to compare periods.'}
        </p>
      ) : (
        <div className="@container">
          <RankedHeader
            labels={[
              'Change',
              'Domain / source',
              'Trend',
              'Details',
              'Last seen',
            ]}
            rightAligned={[]}
            gridClassName={`hidden @md:grid ${CHANGE_ROW_GRID}`}
          />
          <ul className="divide-border divide-y">
            {items.map((item) => (
              <ChangeListRow key={item.id} item={item} nowMs={nowMs} />
            ))}
          </ul>
        </div>
      )}
    </Panel>
  )
}
