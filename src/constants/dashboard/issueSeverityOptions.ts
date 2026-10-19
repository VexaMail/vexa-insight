import type { FilterOption } from '@/types/dashboard'

/** Severity filter of the issues page. */
export const ISSUE_SEVERITY_OPTIONS: readonly FilterOption[] = [
  { value: 'all', label: 'All severities' },
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
]
