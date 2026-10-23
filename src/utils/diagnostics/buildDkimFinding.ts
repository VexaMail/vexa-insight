import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { buildDkimMissingFinding } from './buildDkimMissingFinding'
import { dkimFindingBase } from './dkimFindingBase'

export function buildDkimFinding(dns: DnsDiagnostics): DiagnosticsFinding {
  const valid = dns.dkimParsedRecords.filter((record) => record.valid)
  if (valid.length === 0) return buildDkimMissingFinding(dns)
  const names = valid.map((record) => record.selector).join(', ')
  const weak = valid.filter(
    (record) =>
      record.keyType === 'rsa' &&
      record.keyLengthBits !== null &&
      record.keyLengthBits < 2048,
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
    severity: weak.length > 0 ? 'low' : 'pass',
    state: `Valid key on ${names}`,
    detail: `${count} publish a usable key${viaReports ? ', found through signatures in received reports' : ''}. DNS key presence does not verify message signing.`,
    recommendation:
      weak.length > 0
        ? 'The published RSA key is usable, but 2048 bits or higher is recommended. Plan a rotation with the sender; keep the old selector until mail signed with it has been delivered.'
        : 'No change needed. Rotate keys on a schedule and keep the old selector until mail signed with it has been delivered.',
    fix: null,
    tileValue: 'Valid',
    tileHint: `${String(valid.length)} valid selector${valid.length === 1 ? '' : 's'}`,
  }
}
