import type {
  DiagnosticsFindingBase,
  DnsDiagnostics,
} from '@/types/diagnostics'

export function mtaStsFindingBase(dns: DnsDiagnostics): DiagnosticsFindingBase {
  return {
    id: 'mtaSts',
    protocol: 'MTA-STS',
    check: 'MTA-STS policy',
    observed: dns.mtaSts.raw,
    section: 'mta-sts',
  }
}
