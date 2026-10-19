import { DnsHistoryPanel, DomainDnsTab } from '@/components/domains'
import { computeDomainScore, getDomainDnsRecords } from '@/services/diagnostics'
import { listDnsHistory } from '@/services/dns-history'
import type { DnsTabLoaderProps } from './DnsTabLoaderProps'

/** Resolves the domain's DNS live, only when the DNS tab is open. */
export async function DnsTabLoader({
  domainName,
  domainId = 0,
}: Readonly<DnsTabLoaderProps>) {
  const [dns, history] = await Promise.all([
    getDomainDnsRecords(domainName),
    listDnsHistory(domainName),
  ])
  return (
    <div className="space-y-4">
      <DomainDnsTab
        domainName={domainName}
        score={computeDomainScore(dns)}
        dmarcRecord={dns.dmarc}
      />
      <DnsHistoryPanel domainId={domainId} entries={history} />
    </div>
  )
}
