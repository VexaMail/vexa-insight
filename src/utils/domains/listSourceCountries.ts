import type {
  CountryTally,
  DomainSourceRow,
  SelectOption,
} from '@/types/domains'

/** Country filter options of the sources, by source count. */
export function listSourceCountries(
  rows: readonly DomainSourceRow[],
): SelectOption[] {
  const counts = new Map<string, CountryTally>()
  for (const row of rows) {
    const value = row.countryCode ?? 'unknown'
    const entry = counts.get(value)
    if (entry) entry.sources += 1
    else
      counts.set(value, {
        label: row.countryName ?? 'Unknown country',
        sources: 1,
      })
  }
  return [...counts.entries()]
    .sort((a, b) => b[1].sources - a[1].sources)
    .map(([value, { label, sources }]) => ({
      value,
      label: `${label} (${String(sources)})`,
    }))
}
