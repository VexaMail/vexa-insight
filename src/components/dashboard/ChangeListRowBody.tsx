import { cn } from '@/lib/utils'
import type { ChangeListRowProps } from './ChangeListRowProps'

/** Figure, title and detail of one change. */
export function ChangeListRowBody({ item }: Readonly<ChangeListRowProps>) {
  return (
    <>
      <span
        className={cn(
          'w-24 shrink-0 font-mono text-base font-semibold tabular-nums',
          item.direction === 'better' && 'text-success',
          item.direction === 'worse' && 'text-danger',
          item.direction === 'neutral' && 'text-info',
        )}
      >
        {item.value}
      </span>
      <span className="min-w-0">
        <span className="text-foreground block truncate text-sm font-medium">
          {item.title}
        </span>
        <span className="text-muted-foreground block truncate text-xs">
          {item.detail}
        </span>
      </span>
    </>
  )
}
