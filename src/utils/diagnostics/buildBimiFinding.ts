import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'

export function buildBimiFinding(dns: DnsDiagnostics): DiagnosticsFinding {
  const base = {
    id: 'bimi',
    protocol: 'BIMI',
    check: 'BIMI logo',
    observed: dns.bimi.raw,
    section: 'bimi',
    fix: null,
  } as const
  if (dns.bimi.raw === null) {
    return {
      ...base,
      severity: 'info',
      state: 'No BIMI record',
      detail: `Nothing at default._bimi.${dns.domain}. Optional: it shows a logo in supporting mailboxes.`,
      recommendation:
        'Optional. Publish BIMI once DMARC is at p=quarantine or p=reject.',
      tileValue: 'Not set',
      tileHint: 'Optional',
    }
  }
  return {
    ...base,
    severity: dns.bimi.valid ? 'pass' : 'low',
    state: dns.bimi.valid ? 'Published' : 'Record does not validate',
    detail: dns.bimi.logoUrl ?? 'The record has no logo URL (l=).',
    recommendation: dns.bimi.valid
      ? 'No change needed.'
      : 'Fix the record: v=BIMI1; l=<https URL of an SVG logo>.',
    tileValue: dns.bimi.valid ? 'Present' : 'Invalid',
    tileHint:
      dns.bimi.certificateUrl === null ? 'No certificate' : 'With certificate',
  }
}
