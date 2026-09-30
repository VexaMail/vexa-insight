/** An integer from a number or a numeric string (thousands separators allowed). */
export function toSndsInt(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? Math.trunc(value) : null
  }
  if (typeof value !== 'string') return null
  const cleaned = value.replaceAll(/[,\s]/g, '')
  if (!/^-?\d+(?:\.\d+)?$/.test(cleaned)) return null
  return Math.trunc(Number(cleaned))
}
