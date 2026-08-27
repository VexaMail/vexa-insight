export function parseIngestionInterval(v: unknown): number | undefined {
  if (v === undefined) return undefined
  let n = Number.NaN
  if (typeof v === 'number') n = v
  else if (typeof v === 'string') n = parseInt(v, 10)
  return Number.isFinite(n) && n >= 1 && n <= 1440 ? n : undefined
}
