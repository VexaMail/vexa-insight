import { formatRelativeDate } from '@/utils/format'
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
  hostnameLastLookupAt,
  layout = 'stacked',
  showFlag = true,
  showIp = true,
  showHostname = true,
  ipAsLink = true,
  isRefreshing = false,
  onRefresh,
  className = '',
}: Readonly<IpDisplayProps>) {
  const lastLookup = hostnameLastLookupAt
    ? formatRelativeDate(hostnameLastLookupAt)
    : null

  if (layout === 'none') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showFlag ? (
          <IpFlag countryCode={countryCode} countryName={countryName} />
        ) : null}
        {showIp ? <IpAddressLink ip={ip} ipAsLink={ipAsLink} /> : null}
        {showHostname !== false && (
          <IpHostname
            hostname={hostname}
            hostnameLastLookupAt={hostnameLastLookupAt}
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
        {showFlag ? (
          <IpFlag countryCode={countryCode} countryName={countryName} />
        ) : null}
        <div className="flex min-w-0 items-center gap-2">
          {showIp ? <IpAddressLink ip={ip} ipAsLink={ipAsLink} /> : null}
          {showHostname !== false && (
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
      {showFlag ? (
        <div className="mt-0.5">
          <IpFlag countryCode={countryCode} countryName={countryName} />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2">
          {showIp ? <IpAddressLink ip={ip} ipAsLink={ipAsLink} /> : null}
        </div>
        {showHostname !== false &&
          ((hostname != null && hostname !== '') ||
            showHostname !== 'if-present') && (
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
          )}
      </div>
    </div>
  )
}
