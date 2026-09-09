import type { IpHostnameProps } from './IpHostnameProps'
import { IpHostnameRefresh } from './IpHostnameRefresh'

export function IpHostname({
  hostname,
  hostnameLastLookupAt,
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
      {onRefresh != null && (
        <IpHostnameRefresh
          hostnameLastLookupAt={hostnameLastLookupAt}
          isRefreshing={isRefreshing}
          ip={ip}
          onRefresh={onRefresh}
        />
      )}
    </div>
  )
}
