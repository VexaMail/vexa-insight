import { EntityHeader, StatTile } from '@/components/ui'
import { formatRelativeDate } from '@/utils/format'
import { Clock, Mail } from 'lucide-react'
import type { DomainDetailHeaderProps } from './DomainDetailHeaderProps'
import { DomainDetailToolbar } from './DomainDetailToolbar'
import { DomainFlag } from './DomainFlag'
import { DomainSubtitle } from './DomainSubtitle'
import { HeaderFact } from './HeaderFact'
import { TitleControls } from './TitleControls'

/** Flag, name, policy mode, freshness and volume of a domain. */
export function DomainDetailHeader({
  domainName,
  policy,
  totalMessages,
  dailyVolume,
  reportsHref,
}: Readonly<DomainDetailHeaderProps>) {
  const last = policy ? formatRelativeDate(policy.reportedAt) : null
  return (
    <EntityHeader
      kind="Domain"
      title={domainName}
      leading={<DomainFlag domainName={domainName} />}
      titleAddon={<TitleControls domainName={domainName} />}
      chips={<DomainSubtitle policy={policy} />}
      actions={
        <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
          <DomainDetailToolbar domainName={domainName} />
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:flex lg:w-auto">
            <HeaderFact
              icon={<Clock />}
              label="Last report"
              value={last?.relative ?? 'Never'}
              hint={last ? `from ${policy?.reporter ?? ''}` : undefined}
              title={last?.absolute}
              href={reportsHref}
            />
            <StatTile
              variant="feature"
              icon={<Mail />}
              label="Total messages"
              value={totalMessages.toLocaleString('en-US')}
              hint="All reports · bars: last 30 days"
              trend={dailyVolume}
              trendKind="bars"
              className="lg:w-72"
            />
          </div>
        </div>
      }
    />
  )
}
