import type { IssueFilterState } from './IssueFilterState'
import type { QueuedIssue } from './QueuedIssue'

/** The issues page filters and the rows they leave. */
export type UseIssueFiltersReturn = {
  filter: IssueFilterState
  visible: QueuedIssue[]
  setSeverity: (value: string) => void
  setState: (value: string) => void
  setQuery: (value: string) => void
}
