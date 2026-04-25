export function parseIngestionInterval(v: unknown): number | undefined {
  if (v === undefined) return undefined
  const n = typeof v === 'number' ? v : parseInt(String(v), 10)
  return Number.isFinite(n) && n >= 1 && n <= 1440 ? n : undefined
}
