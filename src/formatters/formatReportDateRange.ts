/**
 * Report begin/end Unix timestamps as `Oct 16 – Oct 17, 2026`, in UTC with a
 * fixed English format, so a server render and the browser's hydration print
 * the same text whatever the viewer's locale or zone. A one-day window prints
 * once (`Oct 16, 2026`); a window across a new year keeps both years.
 */
export function formatReportDateRange(begin: number, end: number): string {
  const from = new Date(begin * 1000)
  const to = new Date(end * 1000)
  const day = (d: Date, withYear: boolean) =>
    d.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: withYear ? 'numeric' : undefined,
    })
  const fromLabel = day(from, from.getUTCFullYear() !== to.getUTCFullYear())
  const toLabel = day(to, true)
  return fromLabel === day(to, false) ? toLabel : `${fromLabel} – ${toLabel}`
}
