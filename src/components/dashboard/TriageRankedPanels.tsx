import { TRIAGE_MIN_VOLUME } from '@/constants/dashboard'
import { DomainRankPanel } from './DomainRankPanel'
import { FailingSourcesPanel } from './FailingSourcesPanel'
import type { TriageOverviewViewProps } from './TriageOverviewViewProps'

/** Lowest domain compliance and the top failing sending sources. */
export function TriageRankedPanels({
  overview,
}: Readonly<Pick<TriageOverviewViewProps, 'overview'>>) {
  const { ranked, rankedTrends, window } = overview
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <DomainRankPanel
        domains={ranked.domains}
        trends={rankedTrends.domains}
        description={`Domains with at least ${String(TRIAGE_MIN_VOLUME)} messages, ${window.label}.`}
      />
      <FailingSourcesPanel
        sources={ranked.sources}
        trends={rankedTrends.sources}
        window={window}
      />
    </div>
  )
}
