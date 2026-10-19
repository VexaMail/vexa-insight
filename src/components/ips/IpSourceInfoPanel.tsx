import { CopyIconButton, Panel } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { formatCountryName } from '@/utils/ips'
import { Info } from 'lucide-react'
import { IpFlag } from './IpFlag'
import { IpInfoRow } from './IpInfoRow'
import { IpSenderName } from './IpSenderName'

/** What is known about the source itself: address, PTR, place and dates. */
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
        <IpInfoRow label="Reverse DNS">
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
        <IpInfoRow label="Country">
          <IpFlag countryCode={data.countryCode} />
          {formatCountryName(data.countryCode) ?? 'Unknown'}
        </IpInfoRow>
        <IpInfoRow label="Sender">
          <IpSenderName sender={ctx.sender} />
        </IpInfoRow>
        <IpInfoRow label="First seen">
          {data.firstSeen
            ? formatRelativeDate(data.firstSeen).absolute
            : 'Unknown'}
        </IpInfoRow>
        <IpInfoRow label="Last seen">
          {data.lastSeen
            ? formatRelativeDate(data.lastSeen).absolute
            : 'Unknown'}
        </IpInfoRow>
        <IpInfoRow label="Total messages">
          <span className="font-mono tabular-nums">
            {data.totalMessages.toLocaleString()}
          </span>
        </IpInfoRow>
      </dl>
    </Panel>
  )
}
