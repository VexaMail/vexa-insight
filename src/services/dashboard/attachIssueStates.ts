import { getIssueStates } from '@/services/issues'
import type { ActionItem, QueuedIssue } from '@/types/dashboard'
import { toQueuedIssue } from '@/utils/dashboard'
import { getIssueActionAccess } from './getIssueActionAccess'

/** Joins each derived issue with the acknowledge/snooze state on its key. */
export async function attachIssueStates(
  items: readonly ActionItem[],
  nowMs: number,
): Promise<QueuedIssue[]> {
  const [states, access] = await Promise.all([
    getIssueStates(
      items.map((item) => item.id),
      nowMs,
    ),
    getIssueActionAccess(),
  ])
  return items.map((item) => toQueuedIssue(item, states.get(item.id), access))
}
