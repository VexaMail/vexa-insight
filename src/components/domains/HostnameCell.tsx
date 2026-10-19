import { cn } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'
import type { HostnameCellProps } from './HostnameCellProps'

/** A hostname, whole or truncated with its full value on hover, plus refresh. */
export function HostnameCell({
  hostname,
  isRefreshing,
  onRefresh,
}: Readonly<HostnameCellProps>) {
  return (
    <div className="group flex max-w-[13rem] min-w-0 items-center gap-1">
      <span className="flex min-w-0 flex-col">
        {hostname ? (
          <span
            className="text-foreground truncate font-mono text-[13px]"
            title={hostname}
          >
            {hostname}
          </span>
        ) : (
          <span className="text-muted-foreground text-xs italic">
            No reverse DNS
          </span>
        )}
      </span>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onRefresh()
        }}
        disabled={isRefreshing}
        aria-label="Look up the hostname again"
        className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md opacity-60 transition duration-150 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
      >
        <RefreshCw
          className={cn('h-3.5 w-3.5', isRefreshing && 'animate-spin')}
        />
      </button>
    </div>
  )
}
