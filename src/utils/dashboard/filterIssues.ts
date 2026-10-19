import type { IssueFilterState, QueuedIssue } from '@/types/dashboard'

/** The issues matching the page's severity, state and text filters. */
export function filterIssues(
  issues: readonly QueuedIssue[],
  filter: IssueFilterState,
): QueuedIssue[] {
  const query = filter.query.trim().toLowerCase()
  return issues.filter(
    (issue) =>
      (filter.severity === 'all' || issue.severity === filter.severity) &&
      (filter.state === 'all' || issue.state === filter.state) &&
      (query === '' ||
        issue.subject.toLowerCase().includes(query) ||
        issue.id.toLowerCase().includes(query)),
  )
}
