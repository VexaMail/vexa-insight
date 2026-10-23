import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { describeCheckedSelectors } from './describeCheckedSelectors'
import { dkimFindingBase } from './dkimFindingBase'

/** No selector answered with a usable key: say exactly what was checked. */
export function buildDkimMissingFinding(
  dns: DnsDiagnostics,
): DiagnosticsFinding {
  const checked = dns.dkim.length
  const reported = dns.dkim.filter((record) => record.fromReports === true)
  const published = dns.dkimParsedRecords.filter((r) => r.raw !== null)
  const wildcard = dns.dkim.some((record) => record.wildcardRevocation)
  const fromReports =
    reported.length > 0
      ? `, including ${String(reported.length)} seen in received reports`
      : ''
  const recommendation = `Find the selector each sender signs with (the s= tag of its DKIM-Signature header) and publish its key at <selector>._domainkey.${dns.domain}.`
  if (published.length > 0) {
    const names = published.map((record) => record.selector).join(', ')
    const error = published[0]?.errors[0]
    return {
      ...dkimFindingBase(dns),
      severity: 'high',
      state: 'Published selector has no usable key',
      detail: `${names} answered, but the record does not validate${error === undefined ? '' : `: ${error}`}.`,
      recommendation,
      fix: null,
      tileValue: 'Invalid',
      tileHint: `${String(published.length)} of ${String(checked)} selectors`,
    }
  }
  return {
    ...dkimFindingBase(dns),
    severity: reported.length > 0 ? 'high' : 'info',
    state: 'No valid DKIM selector found among those checked',
    detail: `Checked ${String(checked)} selectors${fromReports} (${describeCheckedSelectors(dns.dkim)}). A sender using another selector would not show here.${wildcard ? ' A negative DNS wildcard revokes unused selectors; these answers do not identify configured signing keys.' : ''}`,
    recommendation,
    fix: null,
    tileValue: 'None found',
    tileHint: `0 of ${String(checked)} selectors checked`,
  }
}
