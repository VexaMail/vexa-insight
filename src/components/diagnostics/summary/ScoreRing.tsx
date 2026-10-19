import { cn } from '@/lib/utils'
import { ScoreRingArc } from './ScoreRingArc'
import type { ScoreRingProps } from './ScoreRingProps'

/** The score as a ring out of 100, with the figure in the middle. */
export function ScoreRing({
  percentage,
  tone,
  size = 'lg',
  label,
}: Readonly<ScoreRingProps>) {
  const large = size === 'lg'
  return (
    <div className={cn('relative shrink-0', large ? 'h-28 w-28' : 'h-10 w-10')}>
      <ScoreRingArc percentage={percentage} tone={tone} size={size} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            'text-foreground font-mono font-semibold tabular-nums',
            large
              ? 'text-[1.7rem] leading-tight tracking-tight'
              : 'text-[11px]',
          )}
        >
          {percentage}
          {large ? '%' : null}
        </span>
        {large && label ? (
          <span className="text-muted-foreground text-[10px]">{label}</span>
        ) : null}
      </div>
    </div>
  )
}
