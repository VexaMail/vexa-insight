import type { ActionSeverity } from './ActionSeverity'
import type { IssueQueueState } from './IssueQueueState'

/** The filters of the issues page. */
export type IssueFilterState = {
  severity: ActionSeverity | 'all'
  state: IssueQueueState | 'all'
  query: string
}
