import { CopyIconButton, EntityHeader, StatusPill } from '@/components/ui'
import type { IpDetailHeaderProps } from '@/types/ips'
import { formatCountryName } from '@/utils/ips'
import { IpFlag } from './IpFlag'
import { SourceCausePill } from './SourceCausePill'

/** IP with copy, country, reverse DNS with copy, cause and named sender. */
export function IpDetailHeader({
  ctx,
  actions,
}: Readonly<IpDetailHeaderProps>) {
  const { data, sender } = ctx
  const country = formatCountryName(data.countryCode)
  return (
    <EntityHeader
      kind="Sending source"
      title={ctx.ip}
      mono
      titleAddon={<CopyIconButton value={ctx.ip} label="IP address" />}
      actions={actions}
      chips={
        <>
          <SourceCausePill cause={ctx.cause} />
          <span className="text-muted-foreground inline-flex h-6 items-center gap-1.5 text-xs">
            <IpFlag countryCode={data.countryCode} countryName={country} />
            {country ?? 'Unknown country'}
          </span>
          {data.hostname ? (
            <span className="text-muted-foreground inline-flex min-w-0 items-center font-mono text-xs">
              <span className="truncate">{data.hostname}</span>
              <CopyIconButton
                value={data.hostname}
                label="hostname"
                className="h-6 w-6"
              />
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">
              No reverse DNS
            </span>
          )}
          {sender ? (
            <StatusPill tone="neutral">{sender.name}</StatusPill>
          ) : null}
        </>
      }
    />
  )
}
