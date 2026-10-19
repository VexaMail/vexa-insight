import { DomainDnsTab } from '@/components/domains'
import { computeDomainScore, getDomainDnsRecords } from '@/services/diagnostics'
import type { DnsTabLoaderProps } from './DnsTabLoaderProps'

/** Resolves the domain's DNS live, only when the DNS tab is open. */
export async function DnsTabLoader({
  domainName,
}: Readonly<DnsTabLoaderProps>) {
  const dns = await getDomainDnsRecords(domainName)
  return (
    <DomainDnsTab
      domainName={domainName}
      score={computeDomainScore(dns)}
      dmarcRecord={dns.dmarc}
    />
  )
}
