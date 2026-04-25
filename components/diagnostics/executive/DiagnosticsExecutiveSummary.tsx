import { deriveAlignmentStatus } from './deriveAlignmentStatus'
import { deriveAuthenticationHealth } from './deriveAuthenticationHealth'
import { deriveDkimAlignmentRate } from './deriveDkimAlignmentRate'
import { deriveDmarcPosture } from './deriveDmarcPosture'
import { deriveSpfAlignmentRate } from './deriveSpfAlignmentRate'
import type { DiagnosticsExecutiveSummaryProps } from './DiagnosticsExecutiveSummaryProps'
import { ExecutiveMetricCard } from './ExecutiveMetricCard'

export function DiagnosticsExecutiveSummary({
  stats,
  dmarcPolicy,
}: Readonly<DiagnosticsExecutiveSummaryProps>) {
  const auth = deriveAuthenticationHealth(stats)
  const dmarc = deriveDmarcPosture(dmarcPolicy)
  const spfRate = deriveSpfAlignmentRate(stats)
  const dkimRate = deriveDkimAlignmentRate(stats)

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <ExecutiveMetricCard
        label="Auth Health"
        value={stats.totalEvents > 0 ? `${auth.percentage}%` : 'No data'}
        status={auth.status}
      />
      <ExecutiveMetricCard
        label="DMARC Posture"
        value={dmarc.label}
        status={dmarc.status}
      />
      <ExecutiveMetricCard
        label="SPF Alignment"
        value={stats.totalEvents > 0 ? `${spfRate}%` : 'No data'}
        status={deriveAlignmentStatus(spfRate)}
      />
      <ExecutiveMetricCard
        label="DKIM Alignment"
        value={stats.totalEvents > 0 ? `${dkimRate}%` : 'No data'}
        status={deriveAlignmentStatus(dkimRate)}
      />
    </div>
  )
}
