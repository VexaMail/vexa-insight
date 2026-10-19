import { Loader2 } from 'lucide-react'
import type { IpLoadMoreButtonProps } from './IpLoadMoreButtonProps'

/** Trigger that appends the next page to one of the IP detail lists. */
export function IpLoadMoreButton({
  isLoading,
  onLoadMore,
  label,
}: IpLoadMoreButtonProps) {
  return (
    <div className="flex justify-center pt-4">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoading}
        className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2
              className="text-muted-foreground h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </>
        ) : (
          <span>{label}</span>
        )}
      </button>
    </div>
  )
}
