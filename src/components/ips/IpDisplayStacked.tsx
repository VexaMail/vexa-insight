import { formatRelativeDate } from '@/utils/format'
import { resolveIpDisplayOptions } from '@/utils/ips'
import { IpAddressLink } from './IpAddressLink'
import type { IpDisplayProps } from './IpDisplayProps'
import { IpFlag } from './IpFlag'
import { IpStackedHostname } from './IpStackedHostname'

export function IpDisplayStacked(props: Readonly<IpDisplayProps>) {
  const { ip, countryCode, countryName, hostname, hostnameLastLookupAt } = props
  const { className, ipAsLink, isRefreshing, showFlag, showHostname, showIp } =
    resolveIpDisplayOptions(props)

  const hasHostname = hostname != null && hostname !== ''
  const showsHostname =
    showHostname !== false && (hasHostname || showHostname !== 'if-present')

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
        {showsHostname ? (
          <IpStackedHostname
            hostname={hostname}
            ip={ip}
            isRefreshing={isRefreshing}
            lastLookup={
              hostnameLastLookupAt
                ? formatRelativeDate(hostnameLastLookupAt)
                : null
            }
            onRefresh={props.onRefresh}
          />
        ) : null}
      </div>
    </div>
  )
}
