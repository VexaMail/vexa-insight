import type { SpfFlattenListProps } from './SpfFlattenListProps'

/** Includes worth replacing with their IP ranges, heaviest first. */
export function SpfFlattenList({ suggestions }: Readonly<SpfFlattenListProps>) {
  if (suggestions.length === 0) return null
  return (
    <div className="space-y-1.5">
      <p className="text-foreground text-xs font-medium">
        Flattening candidates
      </p>
      <ul className="divide-border border-border divide-y rounded-md border">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.domain}
            className="flex items-center justify-between gap-3 px-3 py-1.5 text-xs"
          >
            <span className="text-foreground min-w-0 font-mono break-all">
              include:{suggestion.domain}
            </span>
            <span className="text-muted-foreground shrink-0 font-mono tabular-nums">
              {suggestion.lookups} lookups
            </span>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground text-xs">
        Publishing an include&apos;s IP ranges instead saves its lookups; the
        ranges then have to be updated by hand when the provider changes them.
      </p>
    </div>
  )
}
