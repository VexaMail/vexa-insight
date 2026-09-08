import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'

export function formatDkimSelectorDetails(dns: DiagnosticsDnsSummary): string {
  return dns.dkimSelectors
    .map((selector) => {
      const parts = [
        `selector=${selector.selector}`,
        `valid=${String(selector.valid)}`,
        `keyType=${selector.keyType ?? 'unknown'}`,
        `keyLengthBits=${String(selector.keyLengthBits ?? 'unknown')}`,
        `publicKeyPresent=${String(selector.publicKeyPresent)}`,
      ]
      if (selector.errors.length > 0) {
        parts.push(`errors=${selector.errors.join(' / ')}`)
      }

      return parts.join(', ')
    })
    .join('\n  - ')
}
