import type { RankedListCardProps } from './RankedListCardProps'

/** Titled glass card holding one of the dashboard's ranked lists. */
export function RankedListCard({ title, children }: RankedListCardProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        {title}
      </h3>
      {children}
    </div>
  )
}
