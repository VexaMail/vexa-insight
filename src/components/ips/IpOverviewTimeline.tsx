import { InlineErrorBlock } from '@/components/ui'
import { IP_OVERVIEW_TIMELINE_SIZE } from '@/constants/ips'
import type { IpDetailContextProps } from '@/types/ips'
import { Clock } from 'lucide-react'
import { IpEventStepper } from './IpEventStepper'
import { IpSummaryList } from './IpSummaryList'

/** The latest events as steppers, linking to the full, filterable timeline. */
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
      <div className="flex flex-col gap-6">
        {ctx.logs.slice(0, IP_OVERVIEW_TIMELINE_SIZE).map((row) => (
          <IpEventStepper
            key={row.eventId}
            row={row}
            ip={ctx.ip}
            hostname={ctx.data.hostname}
          />
        ))}
      </div>
    </IpSummaryList>
  )
}
