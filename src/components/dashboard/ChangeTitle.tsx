import { StatusPill } from '@/components/ui'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { changeTone } from '@/utils/dashboard'
import { ChangeIcon } from './ChangeIcon'
import type { ChangeIconProps } from './ChangeIconProps'

/** Arrow in the change's tone, what happened, and NEW for an arrival. */
export function ChangeTitle({ item }: Readonly<ChangeIconProps>) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span
        aria-hidden
        className={cn(
          'shrink-0 [&_svg]:h-4 [&_svg]:w-4',
          STATUS_TONE_TEXT_CLASSES[changeTone(item.direction)],
        )}
      >
        <ChangeIcon item={item} />
      </span>
      <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
        <span className="text-foreground text-[13px] leading-snug">
          {item.title}
        </span>
        {item.isNew ? (
          <StatusPill tone="success" className="shrink-0">
            NEW
          </StatusPill>
        ) : null}
      </span>
    </span>
  )
}
