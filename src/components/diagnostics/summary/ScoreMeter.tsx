import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { ScoreMeterProps } from './ScoreMeterProps'

/** A thin bar of the score out of 100; the figure beside it carries the value. */
export function ScoreMeter({ percentage, tone }: Readonly<ScoreMeterProps>) {
  return (
    <div
      aria-hidden
      className="bg-muted h-1.5 w-full overflow-hidden rounded-full"
    >
      <div
        className={cn('h-full rounded-full', STATUS_TONE_DOT_CLASSES[tone])}
        style={{ width: `${String(percentage)}%` }}
      />
    </div>
  )
}
