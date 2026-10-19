import { ActionQueuePanel } from './ActionQueuePanel'
import { ChangeListPanel } from './ChangeListPanel'
import { IngestionHealthPanel } from './IngestionHealthPanel'
import { PassRateTrendPanel } from './PassRateTrendPanel'
import { TriageKpiStrip } from './TriageKpiStrip'
import type { TriageOverviewViewProps } from './TriageOverviewViewProps'
import { TriageRankedPanels } from './TriageRankedPanels'

/**
 * The home screen as a triage console: KPIs, then the queue beside the
 * changes, then trend and ingestion, then the ranked tables. A phone keeps
 * the same order with a compact KPI strip and a shortened queue.
 */
export function TriageOverviewView({
  overview,
  nowMs,
  apiKey,
}: Readonly<TriageOverviewViewProps>) {
  const { window } = overview
  return (
    <div className="flex flex-col gap-4">
      <TriageKpiStrip kpis={overview.kpis} window={window} />
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
        <ActionQueuePanel
          className="xl:col-span-7"
          items={overview.actions}
          parked={overview.parkedIssues}
          window={window}
          nowMs={nowMs}
        />
        <ChangeListPanel
          className="xl:col-span-5"
          items={overview.changes}
          window={window}
          nowMs={nowMs}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <PassRateTrendPanel
          className="xl:col-span-7"
          points={overview.trend}
          window={window}
          trendLabel={overview.trendLabel}
        />
        <IngestionHealthPanel
          className="xl:col-span-5"
          health={overview.ingestion}
          nowMs={nowMs}
          reportsTrend={overview.kpis.series.reports}
          apiKey={apiKey}
        />
      </div>
      <TriageRankedPanels overview={overview} />
    </div>
  )
}
