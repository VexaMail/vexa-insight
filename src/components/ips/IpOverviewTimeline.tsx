import { InlineErrorBlock } from '@/components/ui'
import { IP_OVERVIEW_TIMELINE_SIZE } from '@/constants/ips'
import type { IpDetailContextProps } from '@/types/ips'
import { Clock } from 'lucide-react'
import { IpEventTimelineItem } from './IpEventTimelineItem'
import { IpSummaryList } from './IpSummaryList'

/** The latest events, linking to the full, filterable timeline tab. */
export function IpOverviewTimeline({ ctx }: Readonly<IpDetailContextProps>) {
  if (!ctx.logs) {
    return (
      <InlineErrorBlock>
        The event timeline is temporarily unavailable.
      </InlineErrorBlock>
    )
  }
  return (
    <IpSummaryList
      title="Event timeline"
      icon={<Clock />}
      viewAllHref={ctx.tabs.timeline.href}
      isEmpty={ctx.logs.length === 0}
      emptyText="No event in the window."
    >
      <ol className="border-border relative ml-3 space-y-5 border-l pb-1">
        {ctx.logs.slice(0, IP_OVERVIEW_TIMELINE_SIZE).map((row) => (
          <IpEventTimelineItem key={row.eventId} row={row} />
        ))}
      </ol>
    </IpSummaryList>
  )
}
