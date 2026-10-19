import type { IssueEvent } from '@/types/issues'

/** An issue's expandable history, loaded on first open. */
export type UseIssueHistoryReturn = {
  isOpen: boolean
  status: 'idle' | 'loading' | 'error' | 'ready'
  events: IssueEvent[]
  toggle: () => void
}
