import type { DnsDiagnostics } from '@/types/diagnostics'
import type { ProtocolStatuses } from './ProtocolStatuses'
import { deriveProtocolStatus } from './deriveProtocolStatus'

export function deriveProtocolStatuses(dns: DnsDiagnostics): ProtocolStatuses {
  return {
    spf: deriveProtocolStatus(dns.spf !== null, dns.spfValid),
    dkim: deriveProtocolStatus(
      dns.dkim.some((d) => d.record !== null),
      dns.dkim.some((d) => d.valid),
    ),
    dmarc: deriveProtocolStatus(dns.dmarc !== null, dns.dmarcValid),
    bimi: deriveProtocolStatus(dns.bimi.raw !== null, dns.bimi.valid),
    mtaSts: deriveProtocolStatus(dns.mtaSts.raw !== null, dns.mtaSts.valid),
    tlsRpt: deriveProtocolStatus(dns.tlsRpt.raw !== null, dns.tlsRpt.valid),
  }
}
