import { formatRelativeDate } from '@/utils/format'
import { Loader2, RefreshCw } from 'lucide-react'
import type { IpHostnameRefreshProps } from './IpHostnameRefreshProps'

/** Last-lookup note and the force-refresh button, revealed on hover. */
export function IpHostnameRefresh({
  hostnameLastLookupAt,
  isRefreshing,
  ip,
  onRefresh,
}: IpHostnameRefreshProps) {
  const lastLookup = hostnameLastLookupAt
    ? formatRelativeDate(hostnameLastLookupAt)
    : null

  return (
    <div className="flex shrink-0 items-center gap-1.5 opacity-0 transition-opacity group-hover/hostname:opacity-100">
      {lastLookup != null && (
        <span
          className="text-muted-foreground/70 text-[10px]"
          title={`Hostname last fetched on ${lastLookup.absolute}`}
        >
          Updated {lastLookup.relative}
        </span>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onRefresh(e, ip)
        }}
        disabled={isRefreshing}
        className="text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        title="Force refresh hostname"
      >
        {isRefreshing ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <RefreshCw className="h-3 w-3" />
        )}
      </button>
    </div>
  )
}
