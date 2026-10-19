import type { QueuedIssue } from './QueuedIssue'
import type { TriageRuleLoad } from './TriageRuleLoad'

/** Every derived issue with its state, and the inputs it was derived from. */
export type IssueQueue = TriageRuleLoad & {
  issues: QueuedIssue[]
}
