/**
 * An ISO timestamp of the poll status as `2026-10-19 03:00:05 UTC`. Fixed
 * format and zone, so a server render and the browser's hydration print the
 * same text; an unparseable value is shown as given.
 */
export function formatPollStatusTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.toISOString().slice(0, 19).replace('T', ' ')} UTC`
}
