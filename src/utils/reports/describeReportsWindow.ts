import { format } from 'date-fns'

/** "last 30 days" or "1 Oct 2026 – 15 Oct 2026": the window a KPI covers. */
export function describeReportsWindow(
  days: number,
  fromDate: Date | undefined,
  toDate: Date | undefined,
): string {
  if (!fromDate && !toDate) return `last ${String(days)} days`
  const from = fromDate ? format(fromDate, 'd MMM yyyy') : 'the start'
  const to = toDate ? format(toDate, 'd MMM yyyy') : 'today'
  return `${from} – ${to}`
}
