/**
 * Coerces unknown to a finite number. Returns null if not a valid number.
 */
export function coerceNumber(value: unknown): number | null {
  if (value == null) return null
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }
  if (typeof value === 'string') {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}
