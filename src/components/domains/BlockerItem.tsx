import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { BlockerItemProps } from './BlockerItemProps'
import { TileLinkButton } from './TileLinkButton'

/** One enforcement blocker: icon, count, what it is and where to look. */
export function BlockerItem({
  icon,
  count,
  tone,
  title,
  detail,
  href,
  action,
}: Readonly<BlockerItemProps>) {
  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4 sm:flex-nowrap">
      <span className="text-muted-foreground shrink-0 [&_svg]:h-6 [&_svg]:w-6">
        {icon}
      </span>
      <span
        className={cn(
          'shrink-0 font-mono text-3xl font-semibold tabular-nums',
          count > 0 ? STATUS_TONE_TEXT_CLASSES[tone] : 'text-success',
        )}
      >
        {count.toLocaleString('en-US')}
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-foreground block text-sm font-medium">
          {title}
        </span>
        <span className="text-muted-foreground block text-xs">{detail}</span>
      </span>
      <TileLinkButton href={href} className="shrink-0">
        {action}
      </TileLinkButton>
    </div>
  )
}
