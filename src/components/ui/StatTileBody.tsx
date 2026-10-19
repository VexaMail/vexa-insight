import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { StatTileBodyProps } from '@/types/ui'

/** Label, figure with its optional badge, and context line of a `StatTile`. */
export function StatTileBody({
  label,
  value,
  hint,
  badge,
  tone = 'neutral',
  icon,
}: Readonly<StatTileBodyProps>) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground truncate text-sm font-medium">
          {label}
        </p>
        {icon ? (
          <span className="text-muted-foreground shrink-0 [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>
        ) : null}
      </div>
      <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-2">
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
      {hint ? (
        <p className="text-muted-foreground mt-2 text-xs">{hint}</p>
      ) : null}
    </>
  )
}
