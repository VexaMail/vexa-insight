import { formatRelativeDate } from '@/utils/format'
import type { ActionLastSeenProps } from './ActionLastSeenProps'

/** Date of the newest evidence and how long ago that was. */
export function ActionLastSeen({ seconds }: Readonly<ActionLastSeenProps>) {
  if (seconds === null) {
    return <span className="text-muted-foreground text-xs">—</span>
  }
  const { absolute, relative } = formatRelativeDate(seconds)
  return (
    <span className="flex gap-1 text-xs lg:flex-col lg:gap-0">
      <span className="text-foreground">{absolute}</span>
      <span className="text-muted-foreground">{relative}</span>
    </span>
  )
}
