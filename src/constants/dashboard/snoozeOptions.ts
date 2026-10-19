import type { SnoozeOption } from '@/types/dashboard'

/** How long the queue can snooze an issue. */
export const SNOOZE_OPTIONS: readonly SnoozeOption[] = [
  { hours: 24, label: '1 day' },
  { hours: 24 * 7, label: '7 days' },
]
