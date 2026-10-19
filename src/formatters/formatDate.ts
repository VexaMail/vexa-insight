/**
 * `Oct 16, 2026`: the one absolute-date format, in UTC with a fixed English
 * locale so a server render and the browser's hydration print the same text.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
