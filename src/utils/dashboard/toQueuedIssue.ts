import type {
  ActionItem,
  IssueActionAccess,
  QueuedIssue,
} from '@/types/dashboard'
import type { IssueState } from '@/types/issues'
import { canActOnIssue } from './canActOnIssue'
import { issueQueueState } from './issueQueueState'

/** A derived issue joined with its recorded operator state. */
export function toQueuedIssue(
  item: ActionItem,
  state: IssueState | undefined,
  access: IssueActionAccess,
): QueuedIssue {
  return {
    ...item,
    state: issueQueueState(state),
    snoozedUntil: state?.status === 'snoozed' ? state.snoozedUntil : null,
    actedBy: state?.actorName ?? null,
    actedAt: state?.updatedAt ?? null,
    canAct: canActOnIssue(item.id, access),
  }
}
