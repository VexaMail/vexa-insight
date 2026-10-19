import { CopyIconButton, Panel } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { buildExternalLookupLinks, formatCountryName } from '@/utils/ips'
import { Info } from 'lucide-react'
import { IpFlag } from './IpFlag'
import { IpInfoRow } from './IpInfoRow'
import { IpMenu } from './IpMenu'
import { IpNetworkInfoRows } from './IpNetworkInfoRows'
import { IpSenderName } from './IpSenderName'
import { IpSourceActivityRows } from './IpSourceActivityRows'

/** What is known about the source itself: address, PTR, network, dates. */
export function IpSourceInfoPanel({ ctx }: Readonly<IpDetailContextProps>) {
  const { data } = ctx
  const lookup = data.hostnameLastLookupAt
    ? formatRelativeDate(data.hostnameLastLookupAt)
    : null
  return (
    <Panel title="Source information" icon={<Info />}>
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
        <IpInfoRow label="PTR looked up">
          <span title={lookup?.absolute}>{lookup?.relative ?? 'Not yet'}</span>
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
