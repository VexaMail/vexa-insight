/** Unix milliseconds to whole seconds, keeping null. */
export function msToSeconds(ms: number | null): number | null {
  return ms === null ? null : Math.floor(ms / 1000)
}
