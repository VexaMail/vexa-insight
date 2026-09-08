import { Loader2, RefreshCw } from 'lucide-react'
import type { IpStackedHostnameProps } from './IpStackedHostnameProps'

/**
 * The stacked layout's hostname line. Unlike `IpHostname`, which the inline
 * and none layouts use, this one also carries the last-lookup timestamp and a
 * force-refresh control, both revealed on row hover.
 */
export function IpStackedHostname({
  hostname,
  ip,
  isRefreshing,
  lastLookup,
  onRefresh,
}: Readonly<IpStackedHostnameProps>) {
  return (
    <div className="mt-0.5 flex min-w-0 items-center gap-1">
      <span className="text-muted-foreground min-w-0 truncate text-[10px]">
        {hostname || 'Unknown'}
      </span>
      {onRefresh != null && (
        <div className="flex shrink-0 items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
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
      )}
    </div>
  )
}
