import { CopyIconButton, Panel } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { buildExternalLookupLinks, formatCountryName } from '@/utils/ips'
import { Network } from 'lucide-react'
import { IpFlag } from './IpFlag'
import { IpInfoRow } from './IpInfoRow'
import { IpMenu } from './IpMenu'
import { IpNetworkInfoRows } from './IpNetworkInfoRows'
import { IpSenderName } from './IpSenderName'
import { IpSourceActivityRows } from './IpSourceActivityRows'

/** The source itself: address, names, network, place, sender and dates. */
export function IpSourceInfoPanel({ ctx }: Readonly<IpDetailContextProps>) {
  const { data } = ctx
  return (
    <Panel
      title="Identity & Network"
      description="Core information about this sending source."
      icon={<Network />}
    >
      <dl className="divide-border -my-1.5 divide-y">
        <IpInfoRow label="IP address">
          <span className="truncate font-mono">{ctx.ip}</span>
          <CopyIconButton value={ctx.ip} label="IP address" />
        </IpInfoRow>
        <IpInfoRow label="Hostname">
          <span className="truncate font-mono">
            {data.hostname ?? 'None found'}
          </span>
          {data.hostname ? (
            <CopyIconButton value={data.hostname} label="hostname" />
          ) : null}
        </IpInfoRow>
        <IpNetworkInfoRows ip={ctx.ip} />
        <IpInfoRow label="Country">
          <IpFlag countryCode={data.countryCode} />
          {formatCountryName(data.countryCode) ?? 'Unknown'}
        </IpInfoRow>
        <IpInfoRow label="Sender">
          <IpSenderName sender={ctx.sender} />
        </IpInfoRow>
        <IpSourceActivityRows data={data} />
      </dl>
      <div className="mt-4">
        <IpMenu
          label="View in external tools"
          trigger="external"
          items={buildExternalLookupLinks(ctx.ip)}
          block
        />
      </div>
    </Panel>
  )
}
