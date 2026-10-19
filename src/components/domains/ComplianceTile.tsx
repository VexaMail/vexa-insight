import { Sparkline } from '@/components/ui'
import { domainHealthTone, getDomainHealth } from '@/utils/domains'
import { ShieldCheck } from 'lucide-react'
import { ComplianceDelta } from './ComplianceDelta'
import { ComplianceLegend } from './ComplianceLegend'
import { ComplianceRing } from './ComplianceRing'
import type { ComplianceTileProps } from './ComplianceTileProps'
import { DecisionTile } from './DecisionTile'

/** DMARC pass rate over all reports, daily volume and the recent change. */
export function ComplianceTile({
  summary,
  trend,
  dailyVolume,
  historyHref,
}: Readonly<ComplianceTileProps>) {
  const hasData = summary.totalMessages > 0
  return (
    <DecisionTile
      icon={<ShieldCheck />}
      title="Domain compliance"
      href={historyHref}
    >
      <div className="flex items-center gap-4">
        <ComplianceRing
          rate={hasData ? summary.passRatePercent : null}
          tone={domainHealthTone(getDomainHealth(summary))}
          className="h-24 w-24"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <ComplianceLegend summary={summary} />
          <Sparkline
            values={dailyVolume}
            kind="bars"
            tone="info"
            className="h-7 w-full"
            label="Messages per day, last 30 days"
          />
        </div>
      </div>
      <ComplianceDelta trend={trend} />
    </DecisionTile>
  )
}
