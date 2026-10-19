import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { StatTileBodyProps } from '@/types/ui'

/** Label, figure and context line of a `StatTile`. */
export function StatTileBody({
  label,
  value,
  hint,
  tone = 'neutral',
  icon,
}: Readonly<StatTileBodyProps>) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground truncate text-xs font-medium">
          {label}
        </p>
        {icon ? (
          <span className="text-muted-foreground shrink-0 [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>
        ) : null}
      </div>
      <p
        className={cn(
          'mt-1.5 font-mono text-2xl font-semibold tracking-tight tabular-nums',
          STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="text-muted-foreground mt-1 text-xs">{hint}</p>
      ) : null}
    </>
  )
}
