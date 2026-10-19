import type { SelectOption } from '@/types/domains'

/** The status filter of the domains list; values match `getDomainHealth`. */
export const DOMAIN_STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'All', label: 'All statuses' },
  { value: 'Active', label: 'Passing (95% and up)' },
  { value: 'Warning', label: 'Warning (80-95%)' },
  { value: 'Critical', label: 'Critical (below 80%)' },
  { value: 'No data', label: 'No data' },
]
