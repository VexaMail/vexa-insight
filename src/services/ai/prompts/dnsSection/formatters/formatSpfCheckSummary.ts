import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'

export function formatSpfCheckSummary(dns: DiagnosticsDnsSummary): string {
  return dns.spfCategories
    .map((category) => {
      const failed = category.checks
        .filter((check) => !check.passed)
        .map((check) => `${check.name}: ${check.detail}`)

      return failed.length > 0
        ? `${category.category}: ${failed.join(' | ')}`
        : `${category.category}: no issues`
    })
    .join('\n  - ')
}
