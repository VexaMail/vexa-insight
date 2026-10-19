import { DomainHistoryTab } from '@/components/domains'
import { getDomainHealthTimeline } from '@/services/timeline'
import type { DnsTabLoaderProps } from './DnsTabLoaderProps'

/** Builds the 90-day timeline only when the History tab is open. */
export async function HistoryTabLoader({
  domainName,
}: Readonly<DnsTabLoaderProps>) {
  return (
    <DomainHistoryTab
      timeline={await getDomainHealthTimeline(domainName, 90)}
    />
  )
}
