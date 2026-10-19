/**
 * "2026-10-19 08:12 UTC": a fixed UTC format, so the server render, the
 * browser and every viewer's time zone print the same minute.
 */
export function formatHealthTime(date: Date | null): string | undefined {
  if (!date) return undefined
  return `${date.toISOString().slice(0, 16).replace('T', ' ')} UTC`
}
