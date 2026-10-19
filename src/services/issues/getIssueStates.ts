import type { IssueState } from '@/types/issues'
import { deriveIssueState } from '@/utils/issues'
import { listIssueEvents } from './listIssueEvents'

/** Current state of each issue that has any recorded action, by key. */
export async function getIssueStates(
  issueKeys: readonly string[],
  nowMs = Date.now(),
): Promise<Map<string, IssueState>> {
  const events = await listIssueEvents(issueKeys)
  const nowSeconds = Math.floor(nowMs / 1000)
  const states = new Map<string, IssueState>()
  for (const key of new Set(events.map((event) => event.issueKey))) {
    const state = deriveIssueState(
      key,
      events.filter((event) => event.issueKey === key),
      nowSeconds,
    )
    if (state) states.set(key, state)
  }
  return states
}
