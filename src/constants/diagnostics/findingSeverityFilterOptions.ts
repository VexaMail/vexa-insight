import type { FindingSeverityFilter } from '@/types/diagnostics'

/** The choices of the findings severity filter, most urgent first. */
export const findingSeverityFilterOptions: readonly FindingSeverityFilter[] = [
  'all',
  'critical',
  'high',
  'medium',
  'low',
  'info',
  'pass',
]
