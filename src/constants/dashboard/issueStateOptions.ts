import type { FilterOption } from '@/types/dashboard'

/** State filter of the issues page. */
export const ISSUE_STATE_OPTIONS: readonly FilterOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'acknowledged', label: 'Acknowledged' },
  { value: 'snoozed', label: 'Snoozed' },
  { value: 'all', label: 'All states' },
]
