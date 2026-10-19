import type { IssueFilterState } from '@/types/dashboard'

/** A severity select value, or `all` for anything else. */
export function parseIssueSeverityFilter(
  value: string,
): IssueFilterState['severity'] {
  return value === 'critical' || value === 'warning' || value === 'info'
    ? value
    : 'all'
}
