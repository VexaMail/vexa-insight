export function parseDays(value: string | string[] | undefined): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : NaN
  if (!Number.isFinite(n) || n < 1) return 30
  if (n > 9999) return 9999
  return n
}
