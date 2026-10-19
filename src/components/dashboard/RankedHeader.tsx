import { cn } from '@/lib/utils'
import type { RankedHeaderProps } from './RankedHeaderProps'

/** Column labels of a ranked overview table. */
export function RankedHeader({
  labels,
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
      <span>{labels[0]}</span>
      <span className="text-right">{labels[1]}</span>
      <span>{labels[2]}</span>
    </div>
  )
}
