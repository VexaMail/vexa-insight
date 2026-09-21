import type { DomainScoreCheckRowProps } from './DomainScoreCheckRowProps'

/** One protocol line of the score breakdown: points, bar and what to fix. */
export function DomainScoreCheckRow({
  check,
}: Readonly<DomainScoreCheckRowProps>) {
  const ratio = check.max === 0 ? 0 : check.earned / check.max
  const barClass =
    ratio === 1
      ? 'bg-emerald-500'
      : ratio > 0
        ? 'bg-amber-500'
        : 'bg-muted-foreground/30'

  return (
    <div className="grid grid-cols-[5rem_1fr] items-start gap-x-3 gap-y-1 py-2 sm:grid-cols-[6rem_8rem_1fr]">
      <span className="text-foreground text-sm font-semibold">
        {check.label}
      </span>

      <div className="col-start-2 flex items-center gap-2 sm:col-start-2">
        <span className="text-foreground font-mono text-sm tabular-nums">
          {check.weight === 'bonus' && check.earned > 0 ? '+' : ''}
          {check.earned}
          <span className="text-muted-foreground">/{check.max}</span>
        </span>
        <div className="bg-muted h-1.5 w-12 overflow-hidden rounded-full">
          <div
            className={`h-full rounded-full ${barClass}`}
            style={{ width: `${String(Math.round(ratio * 100))}%` }}
          />
        </div>
      </div>

      <p className="text-muted-foreground col-span-2 text-xs sm:col-span-1 sm:col-start-3">
        {check.detail}
      </p>
    </div>
  )
}
