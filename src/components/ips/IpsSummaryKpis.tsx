import { StatTile } from '@/components/ui'
import type { IpsSummaryKpisProps } from '@/types/ips'
import { computeRate, rateVerdict } from '@/utils/ips'
import { Mail, Server, ShieldCheck, ShieldX } from 'lucide-react'

export default function IpsSummaryKpis({
  kpis,
  failingHref,
}: Readonly<IpsSummaryKpisProps>) {
  const passRate = computeRate(kpis.dmarcPassMessages, kpis.totalMessages)
  const sources = kpis.totalSources.toLocaleString('en-US')
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        variant="feature"
        icon={<Server />}
        accent="info"
        label="Sending sources"
        value={sources}
        hint="IPs seen in the window"
      />
      <StatTile
        variant="feature"
        icon={<Mail />}
        accent="info"
        label="Messages"
        value={kpis.totalMessages.toLocaleString('en-US')}
        hint={`Across ${sources} sources`}
      />
      <StatTile
        variant="feature"
        icon={<ShieldCheck />}
        label="DMARC pass"
        value={`${passRate.toFixed(1)}%`}
        tone={rateVerdict(passRate, kpis.totalMessages).tone}
        hint={`${kpis.dmarcPassMessages.toLocaleString('en-US')} of ${kpis.totalMessages.toLocaleString('en-US')} messages`}
      />
      <StatTile
        variant="feature"
        icon={<ShieldX />}
        label="Fail SPF and DKIM"
        value={kpis.failingSources.toLocaleString('en-US')}
        tone={kpis.failingSources > 0 ? 'danger' : 'success'}
        hint={`Of ${sources} sources, neither aligned`}
        href={failingHref}
      />
    </div>
  )
}
