/**
 * Parses a route segment as a positive integer id. Returns the number or null if invalid.
 */
export function parseIdParam(value: string | undefined): number | null {
  if (value == null || value === '') return null
  const n = Number.parseInt(value, 10)
  if (!Number.isInteger(n) || n < 1) return null
  return n
}
