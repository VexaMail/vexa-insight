import type {
  DiagnosticsFinding,
  FindingSeverityFilter,
} from '@/types/diagnostics'

/** Findings of the chosen severity whose text mentions the search terms. */
export function filterFindings(
  findings: readonly DiagnosticsFinding[],
  severity: FindingSeverityFilter,
  search: string,
): DiagnosticsFinding[] {
  const needle = search.trim().toLowerCase()
  return findings.filter((finding) => {
    if (severity !== 'all' && finding.severity !== severity) return false
    if (needle === '') return true
    return [
      finding.protocol,
      finding.check,
      finding.state,
      finding.detail,
      finding.recommendation,
      finding.observed ?? '',
    ].some((text) => text.toLowerCase().includes(needle))
  })
}
