import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { buildDmarcPolicyFinding } from './buildDmarcPolicyFinding'
import { dmarcFindingBase } from './dmarcFindingBase'

export function buildDmarcFinding(dns: DnsDiagnostics): DiagnosticsFinding {
  const base = { ...dmarcFindingBase(dns), fix: null }
  if (dns.dmarc === null) {
    return {
      ...base,
      severity: 'high',
      state: 'No DMARC record',
      detail: `Nothing at _dmarc.${dns.domain}: receivers apply no policy and send no reports.`,
      recommendation:
        'Publish v=DMARC1; p=none with a rua= address, then tighten once reports show which senders are legitimate.',
      tileValue: 'Missing',
      tileHint: 'No _dmarc record',
    }
  }
  if (!dns.dmarcValid) {
    return {
      ...base,
      severity: 'high',
      state: 'Record does not parse',
      detail:
        dns.dmarcWarnings[0] ??
        'Receivers ignore a DMARC record they cannot parse.',
      recommendation:
        'Fix the syntax; receivers treat an invalid record as no record.',
      tileValue: 'Invalid',
      tileHint: 'Ignored by receivers',
    }
  }
  return buildDmarcPolicyFinding(dns, dns.dmarc)
}
