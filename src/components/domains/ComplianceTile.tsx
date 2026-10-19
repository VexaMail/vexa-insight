import { domainHealthTone, getDomainHealth } from '@/utils/domains'
import { ShieldCheck } from 'lucide-react'
import { ComplianceDelta } from './ComplianceDelta'
import { ComplianceRing } from './ComplianceRing'
import type { ComplianceTileProps } from './ComplianceTileProps'
import { DecisionTile } from './DecisionTile'

/** DMARC pass rate over all reports, with the change against last period. */
export function ComplianceTile({
  summary,
  trend,
}: Readonly<ComplianceTileProps>) {
  const hasData = summary.totalMessages > 0
  return (
    <DecisionTile icon={<ShieldCheck />} title="Domain compliance">
      <ComplianceRing
        rate={hasData ? summary.passRatePercent : null}
        tone={domainHealthTone(getDomainHealth(summary))}
      />
      <div className="text-center">
        <p className="text-foreground text-sm font-medium tabular-nums">
          <span className="text-success">
            {summary.passedCount.toLocaleString('en-US')} passed
          </span>
          {' / '}
          <span className="text-danger">
            {summary.failedCount.toLocaleString('en-US')} failed
          </span>
        </p>
        <p className="text-muted-foreground text-xs">
          DMARC pass, of {summary.totalMessages.toLocaleString('en-US')}{' '}
          messages in all reports
        </p>
      </div>
      <ComplianceDelta trend={trend} />
    </DecisionTile>
  )
}
