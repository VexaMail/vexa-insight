import { CopyIconButton, Panel } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { History } from 'lucide-react'
import { IpInfoRow } from './IpInfoRow'
import { IpNetworkPanel } from './IpNetworkPanel'

/** The stored PTR of the source next to the live network lookup. */
export function IpDnsTab({ ctx }: Readonly<IpDetailContextProps>) {
  const { data } = ctx
  const lookup = data.hostnameLastLookupAt
    ? formatRelativeDate(data.hostnameLastLookupAt)
    : null
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <IpNetworkPanel ip={ctx.ip} />
      <Panel
        icon={<History />}
        title="Stored reverse DNS"
        description="The PTR name saved when this source was first enriched; reports show it until the next lookup."
      >
        <dl className="divide-border -my-1.5 divide-y">
          <IpInfoRow label="Hostname">
            <span className="truncate font-mono">
              {data.hostname ?? 'None found'}
            </span>
            {data.hostname ? (
              <CopyIconButton value={data.hostname} label="hostname" />
            ) : null}
          </IpInfoRow>
          <IpInfoRow label="Looked up">
            <span title={lookup?.absolute}>
              {lookup?.relative ?? 'Not yet'}
            </span>
          </IpInfoRow>
        </dl>
      </Panel>
    </div>
  )
}
