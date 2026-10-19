import type { StatusTone } from '@/types/ui'

/** Tone of the report narrative's icon square, per narrative status. */
export const AUTH_SUMMARY_STATUS_TONE = {
  healthy: 'success',
  degraded: 'warning',
  critical: 'danger',
} as const satisfies Record<string, StatusTone>
