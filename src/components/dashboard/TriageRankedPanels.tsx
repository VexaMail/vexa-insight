import { OVERVIEW_TABLE_ROWS, TRIAGE_MIN_VOLUME } from '@/constants/dashboard'
import { lowestComplianceDomains, topDomainsByVolume } from '@/utils/dashboard'
import { Mail, ShieldAlert } from 'lucide-react'
import { DomainRankPanel } from './DomainRankPanel'
import { FailingSourcesPanel } from './FailingSourcesPanel'
import type { TriageOverviewViewProps } from './TriageOverviewViewProps'

/** Top domains by volume, lowest compliance and top failing sources. */
export function TriageRankedPanels({
  overview,
}: Readonly<Pick<TriageOverviewViewProps, 'overview'>>) {
  const { domains, window } = overview
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <DomainRankPanel
        title="Top domains by email volume"
        description={`Reported messages, ${window.label}`}
        icon={<Mail />}
        domains={topDomainsByVolume(domains, OVERVIEW_TABLE_ROWS)}
        emptyText="No domain reported messages in this period."
      />
      <DomainRankPanel
        title="Lowest domain compliance"
        description={`Domains with at least ${String(TRIAGE_MIN_VOLUME)} messages, ${window.label}`}
        icon={<ShieldAlert />}
        domains={lowestComplianceDomains(domains, OVERVIEW_TABLE_ROWS)}
        emptyText="No domain has enough messages to judge."
      />
      <FailingSourcesPanel
        className="lg:col-span-2 xl:col-span-1"
        sources={overview.failingSources}
        window={window}
      />
    </div>
  )
}
