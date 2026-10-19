import { StatTile } from '@/components/ui'
import { complianceTone } from '@/utils/domains'
import type { DomainsKpiStripProps } from './DomainsKpiStripProps'

/** Totals of the domains list: volume, compliance and what needs a look. */
export function DomainsKpiStrip({
  kpis,
  staleDays,
}: Readonly<DomainsKpiStripProps>) {
  const rate = kpis.messages > 0 ? (kpis.passed / kpis.messages) * 100 : null
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <StatTile
        label="Domains"
        value={kpis.domains.toLocaleString('en-US')}
        hint={`${String(kpis.withData)} with report data`}
      />
      <StatTile
        label="Messages"
        value={kpis.messages.toLocaleString('en-US')}
        hint="All reports"
      />
      <StatTile
        label="Compliance"
        value={rate === null ? 'n/a' : `${rate.toFixed(1)}%`}
        tone={complianceTone(rate)}
        hint={`DMARC pass, all reports`}
      />
      <StatTile
        label="Need attention"
        value={kpis.needAttention.toLocaleString('en-US')}
        tone={kpis.needAttention > 0 ? 'warning' : 'success'}
        hint="Below 95% compliance"
      />
      <StatTile
        label="Silent"
        value={kpis.silent.toLocaleString('en-US')}
        tone={kpis.silent > 0 ? 'warning' : 'success'}
        hint={`No report for over ${String(staleDays)} days`}
      />
      <StatTile
        label="Enforcing"
        value={kpis.enforcing.toLocaleString('en-US')}
        tone={kpis.enforcing > 0 ? 'info' : 'neutral'}
        hint={`of ${String(kpis.withPolicy)} at p=quarantine or reject`}
      />
    </div>
  )
}
