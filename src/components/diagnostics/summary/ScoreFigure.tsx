import type { ScoreFigureProps } from './ScoreFigureProps'
import { ScoreRingArc } from './ScoreRingArc'

/** The ring out of 100 with the percentage beside it. */
export function ScoreFigure({ percentage, tone }: Readonly<ScoreFigureProps>) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="h-16 w-16 sm:h-20 sm:w-20">
        <ScoreRingArc percentage={percentage} tone={tone} size="lg" />
      </div>
      <span className="text-foreground font-mono text-3xl font-semibold tracking-tight tabular-nums">
        {percentage}%
      </span>
    </div>
  )
}
