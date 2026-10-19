import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { dmarcFindingBase } from './dmarcFindingBase'
import { withDmarcPolicy } from './withDmarcPolicy'

/** A parsed DMARC record, judged by how strongly its policy is enforced. */
export function buildDmarcPolicyFinding(
  dns: DnsDiagnostics,
  record: string,
): DiagnosticsFinding {
  const base = dmarcFindingBase(dns)
  const host = `_dmarc.${dns.domain}`
  const warning = dns.dmarcWarnings[0]
  if (dns.dmarcPolicy === 'reject') {
    return {
      ...base,
      severity: warning === undefined ? 'pass' : 'low',
      state: 'p=reject (enforced)',
      detail: warning ?? 'Receivers refuse mail that fails DMARC.',
      recommendation: 'No change needed. Keep reading reports for new senders.',
      fix: null,
      tileValue: 'p=reject',
      tileHint: 'Enforced',
    }
  }
  if (dns.dmarcPolicy === 'quarantine') {
    return {
      ...base,
      severity: 'low',
      state: 'p=quarantine',
      detail: warning ?? 'Failing mail goes to spam; p=reject would refuse it.',
      recommendation:
        'Move to p=reject once the quarantined volume is only unauthorized mail.',
      fix: { host, value: withDmarcPolicy(record, 'reject') },
      tileValue: 'p=quarantine',
      tileHint: 'Partly enforced',
    }
  }
  return {
    ...base,
    severity: 'medium',
    state: 'p=none (monitoring only)',
    detail: 'Receivers report failures but still deliver them.',
    recommendation:
      'Move to p=quarantine once reports show every legitimate sender passing aligned SPF or DKIM.',
    fix: { host, value: withDmarcPolicy(record, 'quarantine') },
    tileValue: 'p=none',
    tileHint: 'Monitoring only',
  }
}
