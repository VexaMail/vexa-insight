import { Panel } from '@/components/ui'
import type { IpEvidenceCardProps } from '@/types/ips'
import { ArrowUpRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { IpCountLink } from './IpCountLink'

/** The busiest domain this source sent as, and how many there are. */
export function IpRelatedDomainCard({ ctx }: Readonly<IpEvidenceCardProps>) {
  const domains = ctx.domains ?? []
  const [first] = domains
  return (
    <Panel
      title="Related domain"
      description="Domain this source sent mail as."
      icon={<Globe />}
    >
      {first ? (
        <div className="flex flex-col items-start gap-3">
          <Link
            href={`/domains/${encodeURIComponent(first.domain)}`}
            className="text-info hover:text-primary inline-flex max-w-full items-center gap-1 text-lg font-medium"
          >
            <span className="truncate">{first.domain}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
          <IpCountLink href={ctx.tabs.domains.href}>
            {domains.length} related{' '}
            {domains.length === 1 ? 'domain' : 'domains'}
          </IpCountLink>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          No related domain in the window.
        </p>
      )}
    </Panel>
  )
}
