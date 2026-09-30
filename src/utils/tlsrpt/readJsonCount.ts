/**
 * A session-count field as a non-negative integer. Reporters send numbers,
 * a few send numeric strings; anything else counts as 0 rather than failing
 * the whole report.
 */
export function readJsonCount(
  obj: Record<string, unknown>,
  key: string,
): number {
  const value = obj[key]
  const n = typeof value === 'string' ? Number(value) : value
  if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) return 0
  return Math.floor(n)
}
