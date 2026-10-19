import { ActionQueuePanel } from './ActionQueuePanel'
import { ChangeListPanel } from './ChangeListPanel'
import { IngestionHealthPanel } from './IngestionHealthPanel'
import { PassRateTrendPanel } from './PassRateTrendPanel'
import { TriageKpiStrip } from './TriageKpiStrip'
import type { TriageOverviewViewProps } from './TriageOverviewViewProps'
import { TriageRankedPanels } from './TriageRankedPanels'

/**
 * The home screen as a triage console. Desktop reads KPIs, then the queue
 * beside the changes, then trend and ingestion, then the ranked tables; a
 * phone puts the queue first.
 */
export function TriageOverviewView({
  overview,
  nowMs,
  apiKey,
}: Readonly<TriageOverviewViewProps>) {
  const { window } = overview
  return (
    <div className="flex flex-col gap-4">
      <TriageKpiStrip
        className="order-2 lg:order-none"
        kpis={overview.kpis}
        window={window}
      />
      <div className="order-1 grid grid-cols-1 gap-4 lg:order-none xl:grid-cols-12">
        <ActionQueuePanel
          className="xl:col-span-7"
          items={overview.actions}
          window={window}
        />
        <ChangeListPanel
          className="xl:col-span-5"
          items={overview.changes}
          window={window}
        />
      </div>
      <div className="order-3 grid grid-cols-1 gap-4 lg:order-none xl:grid-cols-12">
        <PassRateTrendPanel
          className="xl:col-span-7"
          points={overview.trend}
          window={window}
        />
        <IngestionHealthPanel
          className="xl:col-span-5"
          health={overview.ingestion}
          nowMs={nowMs}
          apiKey={apiKey}
        />
      </div>
      <div className="order-4 lg:order-none">
        <TriageRankedPanels overview={overview} />
      </div>
    </div>
  )
}
