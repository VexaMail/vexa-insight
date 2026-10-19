import type { TriageWindow } from '@/types/dashboard'

/** "Impact (30d)", or plain "Impact" over all time. */
export function impactLabel(window: TriageWindow): string {
  return window.previous ? `Impact (${String(window.lengthDays)}d)` : 'Impact'
}
