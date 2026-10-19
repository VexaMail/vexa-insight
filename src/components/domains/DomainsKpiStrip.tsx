import { StatTile } from '@/components/ui'
import { complianceTone } from '@/utils/domains'
import { Globe, Mail, ShieldCheck } from 'lucide-react'
import { DomainsAttentionTiles } from './DomainsAttentionTiles'
import type { DomainsKpiStripProps } from './DomainsKpiStripProps'

/** Totals of the domains list: volume, compliance and what needs a look. */
export function DomainsKpiStrip({
  kpis,
  staleDays,
  dailyVolume,
}: Readonly<DomainsKpiStripProps>) {
  const rate = kpis.messages > 0 ? (kpis.passed / kpis.messages) * 100 : null
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatTile
        variant="feature"
        icon={<Globe />}
        label="Domains"
        value={kpis.domains.toLocaleString('en-US')}
        hint={`All reports · ${String(kpis.withData)} with report data`}
      />
      <StatTile
        variant="feature"
        icon={<Mail />}
        label="Messages"
        value={kpis.messages.toLocaleString('en-US')}
        hint="All reports · bars: last 30 days"
        trend={dailyVolume}
        trendKind="bars"
      />
      <StatTile
        variant="feature"
        icon={<ShieldCheck />}
        label="Compliance"
        value={rate === null ? 'n/a' : `${rate.toFixed(1)}%`}
        tone={complianceTone(rate)}
        hint={`All reports · ${kpis.passed.toLocaleString('en-US')} of ${kpis.messages.toLocaleString('en-US')} pass DMARC`}
      />
      <DomainsAttentionTiles kpis={kpis} staleDays={staleDays} />
    </div>
  )
}
