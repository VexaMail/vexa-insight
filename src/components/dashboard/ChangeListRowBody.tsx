import { IconTile, Sparkline } from '@/components/ui'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { changeTone } from '@/utils/dashboard'
import { ChangeIcon } from './ChangeIcon'
import type { ChangeListRowProps } from './ChangeListRowProps'

/** Icon, coloured figure, title and detail of one change, and its trend. */
export function ChangeListRowBody({ item }: Readonly<ChangeListRowProps>) {
  const tone = changeTone(item.direction)
  return (
    <>
      <IconTile tone={tone} size="sm">
        <ChangeIcon item={item} />
      </IconTile>
      <span
        className={cn(
          'w-24 shrink-0 font-mono text-base font-semibold whitespace-nowrap tabular-nums',
          STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        {item.value}
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-foreground block truncate text-sm font-medium">
          {item.title}
        </span>
        <span className="text-muted-foreground block truncate text-xs">
          {item.detail}
        </span>
      </span>
      {item.trend ? (
        <Sparkline
          values={item.trend}
          tone={tone}
          className="hidden h-7 w-28 shrink-0 sm:block"
          label={`Daily trend of ${item.title.toLowerCase()}`}
        />
      ) : null}
    </>
  )
}
