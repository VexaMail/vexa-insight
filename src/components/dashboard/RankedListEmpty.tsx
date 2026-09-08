import type { RankedListEmptyProps } from './RankedListEmptyProps'

/** Dashed placeholder shown when a ranked list has nothing to rank. */
export function RankedListEmpty({ message }: RankedListEmptyProps) {
  return (
    <div className="border-border/50 flex h-32 items-center justify-center rounded-lg border border-dashed">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  )
}
