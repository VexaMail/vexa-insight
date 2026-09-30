/**
 * Arrival time in Unix seconds: the feedback's `Arrival-Date`, else the
 * reported message's `Date`, else the time of parsing.
 */
export function readArrivalDate(
  arrivalDate: string | null,
  messageDate: string | null,
  now: number,
): number {
  for (const candidate of [arrivalDate, messageDate]) {
    if (candidate === null) continue
    const ms = Date.parse(candidate.replace(/\s*\([^)]*\)\s*$/, ''))
    if (!Number.isNaN(ms)) return Math.floor(ms / 1000)
  }
  return Math.floor(now / 1000)
}
