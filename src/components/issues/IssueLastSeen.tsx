import { formatAgo, formatShortDate } from '@/utils/dashboard'
import type { IssueLastSeenProps } from './IssueLastSeenProps'

/** Date of the newest evidence and how long ago that was. */
export function IssueLastSeen({
  seconds,
  nowMs,
}: Readonly<IssueLastSeenProps>) {
  if (seconds === null) {
    return (
      <span className="text-muted-foreground text-xs whitespace-nowrap">
        Not dated
      </span>
    )
  }
  const ms = seconds * 1000
  return (
    <span className="flex gap-1.5 text-xs @xl:flex-col @xl:gap-0">
      <span className="text-foreground">{formatShortDate(ms)}</span>
      <span className="text-muted-foreground">{formatAgo(ms, nowMs)}</span>
    </span>
  )
}
