import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { StatTileBodyProps } from '@/types/ui'
import { IconTile } from './IconTile'
import { Sparkline } from './Sparkline'

/** Icon square, label, figure with its optional badge, and a trend. */
export function StatTileFeatureBody({
  label,
  value,
  hint,
  badge,
  tone = 'neutral',
  icon,
  trend,
  trendKind = 'line',
  accent,
}: Readonly<StatTileBodyProps>) {
  const lead = accent ?? tone
  return (
    <div className="flex items-start gap-3.5">
      {icon ? <IconTile tone={lead}>{icon}</IconTile> : null}
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground line-clamp-2 min-w-0 text-sm font-medium">
          {label}
        </p>
        <div className="mt-1.5 flex items-end justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <p
              className={cn(
                'font-mono text-2xl leading-none font-semibold tracking-tight tabular-nums',
                STATUS_TONE_TEXT_CLASSES[tone],
              )}
            >
              {value}
            </p>
            {badge}
          </div>
          {trend ? (
            <Sparkline values={trend} kind={trendKind} tone={lead} />
          ) : null}
        </div>
        {hint ? (
          <p className="text-muted-foreground mt-2 text-xs">{hint}</p>
        ) : null}
      </div>
    </div>
  )
}
