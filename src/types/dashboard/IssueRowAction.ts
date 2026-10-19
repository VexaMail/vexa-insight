import type { IssueAction } from '@/types/issues'

/** The actions the queue offers on a row. */
export type IssueRowAction = Extract<
  IssueAction,
  'acknowledge' | 'snooze' | 'reopen'
>
