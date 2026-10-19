import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { changeTone } from '@/utils/dashboard'
import type { ChangeIconProps } from './ChangeIconProps'

/** The before and after of a change, with its signed figure under it. */
export function ChangeDetails({ item }: Readonly<ChangeIconProps>) {
  return (
    <span className="flex min-w-0 flex-col text-xs">
      <span className="text-foreground truncate" title={item.detail}>
        {item.detail}
      </span>
      <span
        className={cn(
          'font-mono tabular-nums',
          STATUS_TONE_TEXT_CLASSES[changeTone(item.direction)],
        )}
      >
        {item.value}
      </span>
    </span>
  )
}
