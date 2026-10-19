import { Sparkline } from '@/components/ui'
import { domainHealthBadge } from '@/utils/domains'
import { ShieldCheck } from 'lucide-react'
import { ComplianceDelta } from './ComplianceDelta'
import { ComplianceLegend } from './ComplianceLegend'
import { ComplianceRing } from './ComplianceRing'
import type { ComplianceTileProps } from './ComplianceTileProps'
import { DecisionTile } from './DecisionTile'
import { TileScopeLabel } from './TileScopeLabel'

/**
 * DMARC pass rate over all reports, then the recent trend apart from it:
 * daily volume and the last window against the one before.
 */
export function ComplianceTile({
  summary,
  trend,
  dailyVolume,
  historyHref,
}: Readonly<ComplianceTileProps>) {
  const hasData = summary.totalMessages > 0
  const window = String(trend.days)
  return (
    <DecisionTile
      icon={<ShieldCheck />}
      title="Domain compliance"
      href={historyHref}
    >
      <div className="space-y-2">
        <TileScopeLabel>All reports</TileScopeLabel>
        <div className="flex items-center gap-3">
          <ComplianceRing
            rate={hasData ? summary.passRatePercent : null}
            tone={domainHealthBadge(summary).tone}
            className="h-24 w-24"
          />
          <ComplianceLegend summary={summary} />
        </div>
      </div>
      <div className="border-border mt-auto space-y-2 border-t pt-3">
        <TileScopeLabel>
          Last {window} days vs previous {window}
        </TileScopeLabel>
        <div title="Messages per UTC day, last 30 days">
          <Sparkline
            values={dailyVolume}
            kind="bars"
            tone="info"
            className="h-8 w-full"
            label="Messages per day, last 30 days"
          />
        </div>
        <ComplianceDelta trend={trend} />
      </div>
    </DecisionTile>
  )
}
