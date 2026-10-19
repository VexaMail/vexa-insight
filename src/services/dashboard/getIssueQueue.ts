import type { IssueQueue, TriageWindowInput } from '@/types/dashboard'
import { buildActionQueue } from '@/utils/dashboard'
import { attachIssueStates } from './attachIssueStates'
import { loadTriageRules } from './loadTriageRules'

/**
 * Every issue the overview derives for one window, active or not, each with
 * its operator state. The home shows the active ones; /issues shows all.
 */
export async function getIssueQueue(
  input: TriageWindowInput,
): Promise<IssueQueue> {
  const { rules, allowedIds } = await loadTriageRules(input)
  const issues = await attachIssueStates(
    buildActionQueue(rules),
    input.now.getTime(),
  )
  return { issues, rules, allowedIds }
}
