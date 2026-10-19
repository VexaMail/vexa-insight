import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { StatTileBodyProps } from '@/types/ui'
import { IconTile } from './IconTile'
import { Sparkline } from './Sparkline'

/** Icon square, label, large figure and a trend on the right. */
export function StatTileFeatureBody({
  label,
  value,
  hint,
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
        <p className="text-muted-foreground truncate text-sm">{label}</p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <p
            className={cn(
              'font-mono text-[1.65rem] leading-none font-semibold tracking-tight tabular-nums',
              tone === 'neutral'
                ? 'text-foreground'
                : STATUS_TONE_TEXT_CLASSES[tone],
            )}
          >
            {value}
          </p>
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
