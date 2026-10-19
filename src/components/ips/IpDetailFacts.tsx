import type { IpDetailContextProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { Ban, Clock, Globe, History, Mail, TriangleAlert } from 'lucide-react'
import { IpFact } from './IpFact'
import { IpRelatedDomainsFact } from './IpRelatedDomainsFact'

/** First and last seen, related domains and the disposition counts. */
export function IpDetailFacts({ ctx }: Readonly<IpDetailContextProps>) {
  const { data } = ctx
  const first = data.firstSeen ? formatRelativeDate(data.firstSeen) : null
  const last = data.lastSeen ? formatRelativeDate(data.lastSeen) : null
  return (
    <dl className="glass-card lg:divide-border grid grid-cols-2 gap-x-4 gap-y-5 p-4 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x [&>div]:lg:px-4 [&>div:first-child]:lg:pl-0">
      <IpFact label="First seen" icon={<History />}>
        <span title={first?.absolute}>{first?.relative ?? 'Unknown'}</span>
      </IpFact>
      <IpFact label="Last seen" icon={<Clock />}>
        <span title={last?.absolute}>{last?.relative ?? 'Unknown'}</span>
      </IpFact>
      <IpFact label="Related domains" icon={<Globe />}>
        <IpRelatedDomainsFact
          domains={ctx.domains}
          href={ctx.tabs.domains.href}
        />
      </IpFact>
      <IpFact label="Disposition none" icon={<Mail />}>
        <span className="font-mono tabular-nums">
          {data.dispositionNone.toLocaleString()}
        </span>
      </IpFact>
      <IpFact label="Quarantine" icon={<TriangleAlert />} tone="warning">
        <span className="font-mono tabular-nums">
          {data.dispositionQuarantine.toLocaleString()}
        </span>
      </IpFact>
      <IpFact label="Reject" icon={<Ban />} tone="danger">
        <span className="font-mono tabular-nums">
          {data.dispositionReject.toLocaleString()}
        </span>
      </IpFact>
    </dl>
  )
}
