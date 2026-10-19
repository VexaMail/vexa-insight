import type { TriageWindow } from '@/types/dashboard'

/**
 * How far back a domain's last report may be and still be queued as silent:
 * two periods, at least two weeks, at most half a year, so a domain retired
 * long ago does not sit in the queue for ever.
 */
export function silentLookbackDays(window: TriageWindow): number {
  return Math.min(Math.max(window.lengthDays * 2, 14), 180)
}
