/**
 * `2026-01-31 12:00:05 UTC`. Fixed format and zone, so a server render and the
 * browser's hydration print the same text.
 */
export function formatRunAt(d: Date): string {
  return `${d.toISOString().slice(0, 19).replace('T', ' ')} UTC`
}
