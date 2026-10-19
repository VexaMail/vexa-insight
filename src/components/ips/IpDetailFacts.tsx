import type { IpDetailContextProps } from '@/types/ips'
import { Globe } from 'lucide-react'
import { IpDispositionFacts } from './IpDispositionFacts'
import { IpFact } from './IpFact'
import { IpRelatedDomainsFact } from './IpRelatedDomainsFact'
import { IpSeenFact } from './IpSeenFact'

/** First and last seen in UTC, related domains and the disposition shares. */
export function IpDetailFacts({ ctx }: Readonly<IpDetailContextProps>) {
  const { data } = ctx
  const domains = ctx.domains?.length ?? 0
  return (
    <dl className="glass-card lg:divide-border grid grid-cols-1 gap-x-4 gap-y-5 p-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x [&>div]:lg:px-4 [&>div:first-child]:lg:pl-0">
      <IpSeenFact label="First seen" timestamp={data.firstSeen} />
      <IpSeenFact label="Last seen" timestamp={data.lastSeen} />
      <IpFact
        label="Related domain"
        icon={<Globe />}
        sub={`${String(domains)} ${domains === 1 ? 'domain' : 'domains'}`}
      >
        <IpRelatedDomainsFact
          domains={ctx.domains}
          href={ctx.tabs.domains.href}
        />
      </IpFact>
      <IpDispositionFacts data={data} />
    </dl>
  )
}
