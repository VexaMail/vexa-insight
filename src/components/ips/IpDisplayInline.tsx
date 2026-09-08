import { resolveIpDisplayOptions } from '@/utils/ips'
import { IpAddressLink } from './IpAddressLink'
import type { IpDisplayProps } from './IpDisplayProps'
import { IpFlag } from './IpFlag'
import { IpHostname } from './IpHostname'

export function IpDisplayInline(props: Readonly<IpDisplayProps>) {
  const { ip, countryCode, countryName, hostname } = props
  const { className, ipAsLink, isRefreshing, showFlag, showHostname, showIp } =
    resolveIpDisplayOptions(props)

  return (
    <div className={`group flex items-center gap-2 ${className}`}>
      {showFlag ? (
        <IpFlag countryCode={countryCode} countryName={countryName} />
      ) : null}
      <div className="flex min-w-0 items-center gap-2">
        {showIp ? <IpAddressLink ip={ip} ipAsLink={ipAsLink} /> : null}
        {showHostname === false ? null : (
          <IpHostname
            hostname={hostname}
            showHostname={showHostname}
            isRefreshing={isRefreshing}
            ip={ip}
            onRefresh={props.onRefresh}
          />
        )}
      </div>
    </div>
  )
}
