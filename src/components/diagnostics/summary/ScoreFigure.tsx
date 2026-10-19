import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { ScoreFigureProps } from './ScoreFigureProps'

/** The score in percent, then what it is made of. */
export function ScoreFigure({ score, tone }: Readonly<ScoreFigureProps>) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span
        className={cn(
          'font-mono text-4xl font-semibold tracking-tight tabular-nums',
          STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        {score.percentage}%
      </span>
      <span className="text-muted-foreground font-mono text-xs tabular-nums">
        {score.coreScore}/100 core · +{score.bonusScore} bonus
      </span>
    </div>
  )
}
