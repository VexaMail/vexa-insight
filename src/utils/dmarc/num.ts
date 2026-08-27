export function num(s: unknown): number {
  if (typeof s === 'number' && !Number.isNaN(s)) return s
  if (typeof s !== 'string') return 0
  const n = parseInt(s, 10)
  return Number.isNaN(n) ? 0 : n
}
