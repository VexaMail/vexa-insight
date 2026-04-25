/**
 * Formats report begin/end Unix timestamps as a short date range string.
 */
export function formatReportDateRange(begin: number, end: number): string {
  const from = new Date(begin * 1000).toLocaleDateString()
  const to = new Date(end * 1000).toLocaleDateString()
  return `${from} – ${to}`
}
