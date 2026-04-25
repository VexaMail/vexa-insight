import { Loader2, RefreshCw } from 'lucide-react'
import type { IpHostnameProps } from './IpHostnameProps'

export function IpHostname({
  hostname,
  showHostname,
  isRefreshing,
  ip,
  onRefresh,
}: IpHostnameProps) {
  if (!showHostname || (showHostname === 'if-present' && !hostname)) return null

  return (
    <div className="group/hostname flex items-center gap-2">
      {hostname ? (
        <span className="text-muted-foreground min-w-0 truncate text-sm">
          {hostname}
        </span>
      ) : (
        <span className="text-muted-foreground/50 text-sm italic">Unknown</span>
      )}
      {onRefresh && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRefresh(e, ip)
          }}
          disabled={isRefreshing}
          className="text-muted-foreground hover:text-foreground shrink-0 opacity-0 transition-opacity group-hover/hostname:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
          title="Force refresh hostname"
        >
          {isRefreshing ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
        </button>
      )}
    </div>
  )
}
