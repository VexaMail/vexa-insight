/** "12/40 (30%)"; a zero total reads as 0%. */
export function formatPassRate(count: number, total: number): string {
  const percent = total > 0 ? Math.round((count / total) * 100) : 0
  return `${String(count)}/${String(total)} (${String(percent)}%)`
}
