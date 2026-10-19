import { InlineErrorBlock, Panel } from '@/components/ui'
import { IP_OVERVIEW_TIMELINE_SIZE } from '@/constants/ips'
import type { IpDetailContextProps } from '@/types/ips'
import { filterIpEvents } from '@/utils/ips'
import { Activity } from 'lucide-react'
import { IpEventStepper } from './IpEventStepper'
import { IpTimelineActions } from './IpTimelineActions'

/** The latest events as steppers, filterable, linking to the full timeline. */
export function IpOverviewTimeline({ ctx }: Readonly<IpDetailContextProps>) {
  if (!ctx.logs) {
    return (
      <InlineErrorBlock>
        The event timeline is temporarily unavailable.
      </InlineErrorBlock>
    )
  }
  const rows = filterIpEvents(ctx.logs, ctx.eventFilter).slice(
    0,
    IP_OVERVIEW_TIMELINE_SIZE,
  )
  return (
    <Panel
      title="Event timeline"
      description="How receivers evaluated the latest mail from this source."
      icon={<Activity />}
      actions={<IpTimelineActions ctx={ctx} />}
    >
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No event in the window matches this filter.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {rows.map((row) => (
            <IpEventStepper
              key={row.eventId}
              row={row}
              ip={ctx.ip}
              hostname={ctx.data.hostname}
            />
          ))}
        </div>
      )}
    </Panel>
  )
}
