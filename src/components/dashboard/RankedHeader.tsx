import { cn } from '@/lib/utils'
import type { RankedHeaderProps } from './RankedHeaderProps'

/** Column labels of a ranked overview table. */
export function RankedHeader({
  labels,
  rightAligned,
  gridClassName,
}: Readonly<RankedHeaderProps>) {
  return (
    <div
      aria-hidden
      className={cn(
        'text-muted-foreground border-border grid gap-3 border-b px-4 py-2 text-[11px] font-medium',
        gridClassName,
      )}
    >
      {labels.map((label, index) => (
        <span
          key={`${String(index)}-${label}`}
          className={rightAligned.includes(index) ? 'text-right' : ''}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
