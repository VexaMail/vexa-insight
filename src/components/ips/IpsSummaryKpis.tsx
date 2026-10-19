import { StatTile } from '@/components/ui'
import type { IpsSummaryKpisProps } from '@/types/ips'
import { computeRate, rateVerdict } from '@/utils/ips'

export default function IpsSummaryKpis({
  kpis,
  failingHref,
}: Readonly<IpsSummaryKpisProps>) {
  const passRate = computeRate(kpis.dmarcPassMessages, kpis.totalMessages)
  const sources = kpis.totalSources.toLocaleString()
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile
        label="Sending sources"
        value={sources}
        hint="IPs seen in the window"
      />
      <StatTile
        label="Messages"
        value={kpis.totalMessages.toLocaleString()}
        hint={`Across ${sources} sources`}
      />
      <StatTile
        label="DMARC pass"
        value={`${passRate.toFixed(1)}%`}
        tone={rateVerdict(passRate, kpis.totalMessages).tone}
        hint={`${kpis.dmarcPassMessages.toLocaleString()} of ${kpis.totalMessages.toLocaleString()} messages`}
      />
      <StatTile
        label="Fail SPF and DKIM"
        value={kpis.failingSources.toLocaleString()}
        tone={kpis.failingSources > 0 ? 'danger' : 'success'}
        hint={`Of ${sources} sources, neither aligned`}
        href={failingHref}
      />
    </div>
  )
}
