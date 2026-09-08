import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'

export function formatDkimSelectorNames(
  selectors: DiagnosticsDnsSummary['dkimSelectors'],
  emptyLabel: string,
): string {
  return selectors.length > 0
    ? selectors.map((selector) => selector.selector).join(', ')
    : emptyLabel
}
