/**
 * Formats an ISO date string for poll status display.
 */
export function formatPollStatusTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString()
}
