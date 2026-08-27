export function num(s: unknown): number {
  if (typeof s === 'number' && !Number.isNaN(s)) return s
  const n = parseInt(String(s ?? 0), 10)
  return Number.isNaN(n) ? 0 : n
}
