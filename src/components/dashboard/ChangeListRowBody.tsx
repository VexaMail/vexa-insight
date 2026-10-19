import { Sparkline } from '@/components/ui'
import { CHANGE_ROW_GRID } from '@/constants/dashboard'
import { cn } from '@/lib/utils'
import { changeTone, formatAgo } from '@/utils/dashboard'
import { ChangeDetails } from './ChangeDetails'
import type { ChangeListRowProps } from './ChangeListRowProps'
import { ChangeTitle } from './ChangeTitle'

/** Change, domain or source, trend, details and last seen of one change. */
export function ChangeListRowBody({
  item,
  nowMs,
}: Readonly<ChangeListRowProps>) {
  return (
    <span
      className={cn(
        'grid items-center gap-x-3 gap-y-1 px-4 py-2.5',
        CHANGE_ROW_GRID,
      )}
    >
      <ChangeTitle item={item} />
      <span
        className="text-info truncate text-right text-[13px] @md:text-left"
        title={item.subject}
      >
        {item.subject}
      </span>
      <span className="hidden @md:block">
        {item.trend ? (
          <Sparkline
            values={item.trend}
            tone={changeTone(item.direction)}
            className="h-7 w-full"
            label={`Daily trend of ${item.title.toLowerCase()}`}
          />
        ) : null}
      </span>
      <ChangeDetails item={item} />
      <span className="text-muted-foreground text-right text-xs whitespace-nowrap @md:text-left">
        {item.lastSeenAt === null
          ? 'n/a'
          : formatAgo(item.lastSeenAt * 1000, nowMs)}
      </span>
    </span>
  )
}
