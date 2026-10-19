import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { buildDkimMissingFinding } from './buildDkimMissingFinding'
import { dkimFindingBase } from './dkimFindingBase'

export function buildDkimFinding(dns: DnsDiagnostics): DiagnosticsFinding {
  const valid = dns.dkimParsedRecords.filter((record) => record.valid)
  if (valid.length === 0) return buildDkimMissingFinding(dns)
  const names = valid.map((record) => record.selector).join(', ')
  const weak = valid.filter(
    (record) => record.keyLengthBits !== null && record.keyLengthBits < 1024,
  )
  const viaReports = valid.some((record) =>
    dns.dkim.some(
      (probe) =>
        probe.selector === record.selector && probe.fromReports === true,
    ),
  )
  const count = `${String(valid.length)} of ${String(dns.dkim.length)} selectors checked`
  return {
    ...dkimFindingBase(dns),
    severity: weak.length > 0 ? 'medium' : 'pass',
    state:
      weak.length > 0
        ? `Weak key on ${weak.map((record) => record.selector).join(', ')}`
        : `Valid key on ${names}`,
    detail: `${count} publish a usable key${viaReports ? ', found through signatures in received reports' : ''}.`,
    recommendation:
      weak.length > 0
        ? 'Rotate to a 2048-bit key; keys under 1024 bits are rejected by major receivers.'
        : 'No change needed. Rotate keys on a schedule and keep the old selector until mail signed with it has been delivered.',
    fix: null,
    tileValue: weak.length > 0 ? 'Weak key' : 'Valid',
    tileHint: `${String(valid.length)} valid selector${valid.length === 1 ? '' : 's'}`,
  }
}
