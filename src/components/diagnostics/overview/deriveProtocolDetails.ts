import type { DnsDiagnostics } from '@/types/diagnostics'
import type { ProtocolDetails } from './ProtocolDetails'

/** The short detail line per protocol; absent when there is nothing to say. */
export function deriveProtocolDetails(dns: DnsDiagnostics): ProtocolDetails {
  const details: ProtocolDetails = {}
  const validDkim = dns.dkim.filter((d) => d.valid).length
  if (dns.spf) details.spf = 'Record found'
  if (validDkim > 0) details.dkim = `${String(validDkim)} selector(s)`
  if (dns.dmarcPolicy) details.dmarc = `Policy: ${dns.dmarcPolicy}`
  if (dns.bimi.logoUrl) details.bimi = 'Logo found'
  if (dns.mtaSts.mode) details.mtaSts = `Mode: ${dns.mtaSts.mode}`
  if (dns.tlsRpt.ruaAddresses.length > 0) {
    details.tlsRpt = `${String(dns.tlsRpt.ruaAddresses.length)} RUA address(es)`
  }
  return details
}
