import type { IssueFilterState } from '@/types/dashboard'

/** A state select value, or `all` for anything else. */
export function parseIssueStateFilter(
  value: string,
): IssueFilterState['state'] {
  return value === 'active' || value === 'acknowledged' || value === 'snoozed'
    ? value
    : 'all'
}
