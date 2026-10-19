import type {
  CountryVolume,
  DomainSourceRow,
  PrimaryCountry,
} from '@/types/domains'

/** The source country with the most messages, or null with no located source. */
export function topCountryByVolume(
  rows: readonly DomainSourceRow[],
): PrimaryCountry | null {
  const volume = new Map<string, CountryVolume>()
  let total = 0
  for (const row of rows) {
    total += row.count
    if (!row.countryCode) continue
    const entry = volume.get(row.countryCode)
    if (entry) entry.messages += row.count
    else
      volume.set(row.countryCode, {
        name: row.countryName ?? row.countryCode,
        messages: row.count,
      })
  }
  const [top] = [...volume.entries()].sort(
    (a, b) => b[1].messages - a[1].messages,
  )
  if (!top || total === 0) return null
  return {
    code: top[0],
    name: top[1].name,
    share: (top[1].messages / total) * 100,
  }
}
