import { cn } from '@/lib/utils'
import type { RateBarProps } from './RateBarProps'

/** A thin 0-100% bar next to a rate figure. */
export function RateBar({ rate, barClassName }: Readonly<RateBarProps>) {
  return (
    <span
      aria-hidden
      className="bg-secondary block h-1.5 w-full overflow-hidden rounded-full"
    >
      <span
        className={cn('block h-full rounded-full', barClassName)}
        style={{ width: `${String(Math.max(2, Math.min(100, rate ?? 0)))}%` }}
      />
    </span>
  )
}
