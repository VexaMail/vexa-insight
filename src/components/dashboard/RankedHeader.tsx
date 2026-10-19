import { cn } from '@/lib/utils'
import type { RankedHeaderProps } from './RankedHeaderProps'

/** Column labels of a ranked overview table. */
export function RankedHeader({
  labels,
  rightAligned,
  hiddenOnPhone = [],
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
          className={cn(
            rightAligned.includes(index) && 'text-right',
            hiddenOnPhone.includes(index) && 'hidden sm:block',
          )}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
