import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { spfLookupHint } from './spfLookupHint'

export function buildSpfFinding(dns: DnsDiagnostics): DiagnosticsFinding {
  const base = {
    id: 'spf',
    protocol: 'SPF',
    check: 'SPF record',
    observed: dns.spf,
    section: 'spf',
    fix: null,
  } as const
  if (dns.spf === null) {
    return {
      ...base,
      severity: 'high',
      state: 'No SPF record',
      detail: `No TXT record starting with v=spf1 at ${dns.domain}.`,
      recommendation:
        'Publish one SPF record listing every service that sends as this domain, ending in ~all or -all.',
      tileValue: 'Missing',
      tileHint: 'No v=spf1 record',
    }
  }
  if (!dns.spfValid) {
    return {
      ...base,
      severity: 'high',
      state: 'Record does not validate',
      detail: dns.spfWarning ?? 'The record failed the syntax or limit checks.',
      recommendation:
        'Fix the record so receivers can evaluate it; the SPF checks and the lookup tree show where it breaks.',
      tileValue: 'Invalid',
      tileHint: spfLookupHint(dns),
    }
  }
  const warning = dns.spfWarning
  return {
    ...base,
    severity: warning === null ? 'pass' : 'low',
    state: warning === null ? 'Valid' : 'Valid, with a warning',
    detail: warning ?? `${spfLookupHint(dns)} used of the 10 allowed.`,
    recommendation:
      warning === null
        ? 'No change needed. Check the lookup count again after adding a sending service.'
        : 'Review the warning; receivers still evaluate the record.',
    tileValue: 'Valid',
    tileHint: spfLookupHint(dns),
  }
}
