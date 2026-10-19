import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { dmarcRuaMailto } from './dmarcRuaMailto'

export function buildTlsRptFinding(dns: DnsDiagnostics): DiagnosticsFinding {
  const host = `_smtp._tls.${dns.domain}`
  const base = {
    id: 'tlsRpt',
    protocol: 'TLS-RPT',
    check: 'TLS reporting',
    observed: dns.tlsRpt.raw,
    section: 'tls-rpt',
  } as const
  if (dns.tlsRpt.raw === null) {
    const mailto = dmarcRuaMailto(dns)
    return {
      ...base,
      severity: 'low',
      state: 'No TLS-RPT record',
      detail: `Nothing at ${host}: TLS delivery failures to your MX go unreported.`,
      recommendation:
        mailto === null
          ? 'Publish v=TLSRPTv1 with a rua= address that receives the reports.'
          : 'Publish v=TLSRPTv1 pointing at the mailbox that already receives your DMARC reports.',
      fix:
        mailto === null ? null : { host, value: `v=TLSRPTv1; rua=${mailto}` },
      tileValue: 'Missing',
      tileHint: 'Optional',
    }
  }
  const count = dns.tlsRpt.ruaAddresses.length
  return {
    ...base,
    severity: dns.tlsRpt.valid ? 'pass' : 'medium',
    state: dns.tlsRpt.valid ? 'Published' : 'Record does not validate',
    detail: dns.tlsRpt.valid
      ? `Reports go to ${dns.tlsRpt.ruaAddresses.join(', ')}.`
      : 'The record must read v=TLSRPTv1; rua=<mailto: or https: address>.',
    recommendation: dns.tlsRpt.valid
      ? 'No change needed.'
      : 'Fix the record so sending servers know where to report.',
    fix: null,
    tileValue: dns.tlsRpt.valid ? 'Present' : 'Invalid',
    tileHint: `${String(count)} report address${count === 1 ? '' : 'es'}`,
  }
}
