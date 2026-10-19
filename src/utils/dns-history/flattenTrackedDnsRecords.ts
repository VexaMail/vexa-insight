import type { DnsDiagnostics } from '@/types/diagnostics'
import type { TrackedDnsRecords } from '@/types/dns-history'

/**
 * The records worth a change history, as comparable strings. MX is sorted so
 * a resolver returning the same set in another order is not a change; DKIM
 * lists only the selectors that answered, since an unused selector is noise.
 */
export function flattenTrackedDnsRecords(
  dns: DnsDiagnostics,
): TrackedDnsRecords {
  const records: TrackedDnsRecords = {
    spf: dns.spf,
    dmarc: dns.dmarc,
    mx:
      dns.mx.length === 0
        ? null
        : dns.mx
            .map((mx) => `${String(mx.priority)} ${mx.exchange}`)
            .sort()
            .join('\n'),
    mta_sts: dns.mtaSts.raw,
    tls_rpt: dns.tlsRpt.raw,
    bimi: dns.bimi.raw,
  }
  for (const dkim of dns.dkim) {
    if (dkim.record !== null) records[`dkim:${dkim.selector}`] = dkim.record
  }
  return records
}
