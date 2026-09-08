import type { ShareBarProps } from './ShareBarProps'

/** Horizontal bar showing one row's share of the largest value in a list. */
export function ShareBar({ percent, className }: ShareBarProps) {
  return (
    <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
      <div
        className={`h-full rounded-full transition-all ${className}`}
        style={{ width: `${String(percent)}%` }}
      />
    </div>
  )
}
