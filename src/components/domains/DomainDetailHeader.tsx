import { EntityHeader } from '@/components/ui'
import { formatRelativeDate } from '@/utils/format'
import { Clock, Mail } from 'lucide-react'
import type { DomainDetailHeaderProps } from './DomainDetailHeaderProps'
import { DomainPolicyChip } from './DomainPolicyChip'
import { HeaderFact } from './HeaderFact'
import { TitleControls } from './TitleControls'

/** Domain name, copy and open controls, published policy and freshness. */
export function DomainDetailHeader({
  domainName,
  policy,
  totalMessages,
  reportsHref,
}: Readonly<DomainDetailHeaderProps>) {
  const last = policy ? formatRelativeDate(policy.reportedAt) : null
  return (
    <EntityHeader
      kind="Domain"
      title={domainName}
      titleAddon={<TitleControls domainName={domainName} />}
      chips={
        <>
          <DomainPolicyChip policy={policy} withMode />
          {policy ? (
            <span className="text-muted-foreground text-xs">
              as quoted by {policy.reporter} on {last?.absolute}
            </span>
          ) : null}
        </>
      }
      actions={
        <div className="grid w-full grid-cols-2 gap-3 lg:flex lg:w-auto">
          <HeaderFact
            icon={<Clock />}
            label="Last report"
            value={last?.relative ?? 'Never'}
            title={last?.absolute}
            href={reportsHref}
          />
          <HeaderFact
            icon={<Mail />}
            label="Messages, all reports"
            value={totalMessages.toLocaleString('en-US')}
          />
        </div>
      }
    />
  )
}
