export function computeRate(count: number, total: number): number {
  if (total === 0) return 0
  return Math.round((count / total) * 10000) / 100
}
