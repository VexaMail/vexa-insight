import type { IpDetailContextProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { IpFact } from './IpFact'
import { IpRelatedDomainsFact } from './IpRelatedDomainsFact'

/** First and last seen, related domains and the disposition counts. */
export function IpDetailFacts({ ctx }: Readonly<IpDetailContextProps>) {
  const { data } = ctx
  const first = data.firstSeen ? formatRelativeDate(data.firstSeen) : null
  const last = data.lastSeen ? formatRelativeDate(data.lastSeen) : null
  return (
    <dl className="glass-card grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-6">
      <IpFact label="First seen">
        <span title={first?.absolute}>{first?.relative ?? 'Unknown'}</span>
      </IpFact>
      <IpFact label="Last seen">
        <span title={last?.absolute}>{last?.relative ?? 'Unknown'}</span>
      </IpFact>
      <IpFact label="Related domains">
        <IpRelatedDomainsFact
          domains={ctx.domains}
          href={ctx.tabs.domains.href}
        />
      </IpFact>
      <IpFact label="Disposition none">
        <span className="font-mono tabular-nums">
          {data.dispositionNone.toLocaleString()}
        </span>
      </IpFact>
      <IpFact label="Quarantine">
        <span className="text-warning font-mono tabular-nums">
          {data.dispositionQuarantine.toLocaleString()}
        </span>
      </IpFact>
      <IpFact label="Reject">
        <span className="text-danger font-mono tabular-nums">
          {data.dispositionReject.toLocaleString()}
        </span>
      </IpFact>
    </dl>
  )
}
