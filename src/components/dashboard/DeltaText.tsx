import { cn } from '@/lib/utils'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { DeltaTextProps } from './DeltaTextProps'

/** A signed change, green when it is good news and red when it is bad. */
export function DeltaText({
  value,
  direction,
  className,
}: Readonly<DeltaTextProps>) {
  const Icon = value.startsWith('-')
    ? ArrowDownRight
    : value.startsWith('+')
      ? ArrowUpRight
      : Minus
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 font-mono font-medium tabular-nums',
        direction === 'better' && 'text-success',
        direction === 'worse' && 'text-danger',
        direction === 'neutral' && 'text-info',
        className,
      )}
    >
      <Icon aria-hidden className="h-3 w-3" />
      {value}
    </span>
  )
}
