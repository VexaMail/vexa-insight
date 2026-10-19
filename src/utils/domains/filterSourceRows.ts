import type { DomainSourceRow, SourceClassFilter } from '@/types/domains'
import { matchesSourceClass } from './matchesSourceClass'

/** Sources matching the classification and country filters. */
export function filterSourceRows(
  rows: readonly DomainSourceRow[],
  classFilter: SourceClassFilter,
  country: string,
): DomainSourceRow[] {
  return rows.filter(
    (row) =>
      matchesSourceClass(row, classFilter) &&
      (country === 'all' || (row.countryCode ?? 'unknown') === country),
  )
}
