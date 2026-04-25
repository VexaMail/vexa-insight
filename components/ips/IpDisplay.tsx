import { Loader2, RefreshCw } from 'lucide-react'
import { IpAddressLink } from './IpAddressLink'
import type { IpDisplayProps } from './IpDisplayProps'
import { IpFlag } from './IpFlag'
import { IpHostname } from './IpHostname'

export function IpDisplay({
  ip,
  countryCode,
  countryName,
  hostname,
  layout = 'stacked',
  showFlag = true,
  showIp = true,
  showHostname = true,
  ipAsLink = true,
  isRefreshing = false,
  onRefresh,
  className = '',
}: Readonly<IpDisplayProps>) {
  if (layout === 'none') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showFlag && (
          <IpFlag countryCode={countryCode} countryName={countryName} />
        )}
        {showIp && <IpAddressLink ip={ip} ipAsLink={ipAsLink} />}
        {showHostname && (
          <IpHostname
            hostname={hostname}
            showHostname={showHostname}
            isRefreshing={isRefreshing}
            ip={ip}
            onRefresh={onRefresh}
          />
        )}
      </div>
    )
  }

  if (layout === 'inline') {
    return (
      <div className={`group flex items-center gap-2 ${className}`}>
        {showFlag && (
          <IpFlag countryCode={countryCode} countryName={countryName} />
        )}
        <div className="flex min-w-0 items-center gap-2">
          {showIp && <IpAddressLink ip={ip} ipAsLink={ipAsLink} />}
          {showHostname && (
            <IpHostname
              hostname={hostname}
              showHostname={showHostname}
              isRefreshing={isRefreshing}
              ip={ip}
              onRefresh={onRefresh}
            />
          )}
        </div>
      </div>
    )
  }

  // default 'stacked'
  return (
    <div className={`group flex items-start gap-2 ${className}`}>
      {showFlag && (
        <div className="mt-0.5">
          <IpFlag countryCode={countryCode} countryName={countryName} />
        </div>
      )}
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2">
          {showIp && <IpAddressLink ip={ip} ipAsLink={ipAsLink} />}
        </div>
        {showHostname && (hostname || showHostname !== 'if-present') && (
          <div className="mt-0.5 flex min-w-0 items-center gap-1">
            <span className="text-muted-foreground min-w-0 truncate text-[10px]">
              {hostname || 'Unknown'}
            </span>
            {onRefresh && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onRefresh(e, ip)
                }}
                disabled={isRefreshing}
                className="text-muted-foreground hover:text-foreground shrink-0 opacity-0 transition-opacity group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
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
        )}
      </div>
    </div>
  )
}
