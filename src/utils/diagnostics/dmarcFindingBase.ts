import type {
  DiagnosticsFindingBase,
  DnsDiagnostics,
} from '@/types/diagnostics'

export function dmarcFindingBase(dns: DnsDiagnostics): DiagnosticsFindingBase {
  return {
    id: 'dmarc',
    protocol: 'DMARC',
    check: 'DMARC policy',
    observed: dns.dmarc,
    section: 'dmarc',
  }
}
