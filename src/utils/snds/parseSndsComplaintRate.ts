/**
 * Turns an SNDS complaint rate into a fraction. The portal writes it as a
 * percentage, often as "< 0.1%"; a bound is kept as its value, which is the
 * conservative reading for alerting. Bare numbers are read as percentages too,
 * matching the CSV export.
 */
export function parseSndsComplaintRate(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value / 100 : null
  }
  if (typeof value !== 'string') return null
  const match = /(-?\d+(?:\.\d+)?)/.exec(value.replaceAll(',', '.'))
  if (!match?.[1]) return null
  return Number(match[1]) / 100
}
