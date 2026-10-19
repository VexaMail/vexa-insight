import type { IpLastSeenProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'

/** Relative last-seen time, with the date on hover. */
export function IpLastSeen({ lastSeen }: Readonly<IpLastSeenProps>) {
  if (!lastSeen) {
    return <span className="text-muted-foreground text-sm">Unknown</span>
  }
  const { relative, absolute } = formatRelativeDate(lastSeen)
  return (
    <span
      className="text-muted-foreground text-sm whitespace-nowrap"
      title={absolute}
    >
      {relative}
    </span>
  )
}
