import { resolveIpDisplayOptions } from '@/utils/ips'
import { IpAddressLink } from './IpAddressLink'
import type { IpDisplayProps } from './IpDisplayProps'
import { IpFlag } from './IpFlag'
import { IpHostname } from './IpHostname'

export function IpDisplayNone(props: Readonly<IpDisplayProps>) {
  const { ip, countryCode, countryName, hostname, hostnameLastLookupAt } = props
  const { className, ipAsLink, isRefreshing, showFlag, showHostname, showIp } =
    resolveIpDisplayOptions(props)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showFlag ? (
        <IpFlag countryCode={countryCode} countryName={countryName} />
      ) : null}
      {showIp ? <IpAddressLink ip={ip} ipAsLink={ipAsLink} /> : null}
      {showHostname === false ? null : (
        <IpHostname
          hostname={hostname}
          hostnameLastLookupAt={hostnameLastLookupAt}
          showHostname={showHostname}
          isRefreshing={isRefreshing}
          ip={ip}
          onRefresh={props.onRefresh}
        />
      )}
    </div>
  )
}
