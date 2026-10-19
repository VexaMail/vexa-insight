import { InlineErrorBlock } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { IpEventLogs } from './IpEventLogs'

/** The full event timeline with its search, filters and paging. */
export function IpTimelineTab({ ctx }: Readonly<IpDetailContextProps>) {
  if (!ctx.logs) {
    return (
      <InlineErrorBlock>
        The event timeline is temporarily unavailable.
      </InlineErrorBlock>
    )
  }
  return (
    <IpEventLogs initialLogs={ctx.logs} ip={ctx.ip} dateRange={ctx.dateRange} />
  )
}
