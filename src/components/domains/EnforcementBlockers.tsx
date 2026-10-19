import { sourcesReviewHref } from '@/utils/domains'
import { Mail, TriangleAlert, Users } from 'lucide-react'
import { BlockerItem } from './BlockerItem'
import type { EnforcementBlockersProps } from './EnforcementBlockersProps'

/** What would break if the domain enforced today, with links to the sources. */
export function EnforcementBlockers({
  domainName,
  readiness,
}: Readonly<EnforcementBlockersProps>) {
  const { days } = readiness
  return (
    <section className="glass-card space-y-4 p-4">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
          <TriangleAlert className="text-danger h-4 w-4" aria-hidden />
          Enforcement blockers
        </h2>
        <p className="text-muted-foreground text-xs">
          What could make legitimate mail be rejected under p=quarantine or
          p=reject, from the last {days} days of reports.
        </p>
      </header>
      <div className="divide-border flex flex-col gap-4 lg:flex-row lg:divide-x lg:[&>*:not(:first-child)]:pl-4">
        <BlockerItem
          icon={<Users />}
          count={readiness.failingSourcesByKind.legitimate}
          tone="danger"
          title="Unaligned legitimate senders"
          detail={`${readiness.failingByKind.legitimate.toLocaleString('en-US')} failing messages that enforcement would lose.`}
          href={sourcesReviewHref(domainName, days, 'legitimate')}
          action="View senders"
        />
        <BlockerItem
          icon={<Mail />}
          count={readiness.failingSourcesByKind.forwarded}
          tone="info"
          title="Forwarding or mailing list sources"
          detail={`${readiness.failingByKind.forwarded.toLocaleString('en-US')} failing messages relayed; SPF breaks on forwarding.`}
          href={sourcesReviewHref(domainName, days, 'forwarded')}
          action="View sources"
        />
      </div>
    </section>
  )
}
