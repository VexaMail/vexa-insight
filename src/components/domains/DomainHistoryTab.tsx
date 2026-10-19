import { EmptyState, Panel } from '@/components/ui'
import type { DomainHistoryTabProps } from '@/types/domains'
import { History, ListChecks } from 'lucide-react'
import { TimelineDayBars } from './TimelineDayBars'
import { TimelineEventItem } from './TimelineEventItem'

/** Daily results over 90 days and what changed around them. */
export function DomainHistoryTab({
  timeline,
}: Readonly<DomainHistoryTabProps>) {
  return (
    <div className="space-y-4">
      <Panel
        icon={<History />}
        title="DMARC pass rate, last 90 days"
        description="One bar per day with reports; hover a bar for its rate and volume."
      >
        {timeline.days.length === 0 ? (
          <EmptyState>No reports in the last 90 days.</EmptyState>
        ) : (
          <TimelineDayBars timeline={timeline} />
        )}
      </Panel>
      <Panel
        flush
        icon={<ListChecks />}
        title="What changed"
        description="DNS record changes, sources seen for the first time, operator verdicts and issue actions, newest first."
      >
        {timeline.events.length === 0 ? (
          <div className="p-4">
            <EmptyState>Nothing changed in the last 90 days.</EmptyState>
          </div>
        ) : (
          <ol className="divide-border divide-y">
            {timeline.events.map((event) => (
              <TimelineEventItem
                key={`${event.kind}-${String(event.at)}-${event.detail ?? ''}`}
                event={event}
              />
            ))}
          </ol>
        )}
      </Panel>
    </div>
  )
}
