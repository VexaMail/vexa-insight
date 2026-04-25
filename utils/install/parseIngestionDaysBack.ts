export function parseIngestionDaysBack(v: unknown): number {
  if (v === undefined) return 0
  const n = typeof v === 'number' ? v : parseInt(String(v), 10)
  return Number.isFinite(n) && n >= 0 && n <= 365 ? n : 0
}
