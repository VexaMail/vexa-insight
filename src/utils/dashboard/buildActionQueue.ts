import type { ActionItem, TriageRuleInput } from '@/types/dashboard'
import { compareActionItems } from './compareActionItems'
import { domainComplianceAction } from './domainComplianceAction'
import { ingestionActions } from './ingestionActions'
import { newFailingSourceActions } from './newFailingSourceActions'
import { silentDomainAction } from './silentDomainAction'

/**
 * The "Action required" queue: ingestion problems, domains whose reports
 * stopped, domains whose compliance dropped or is low with enough volume, and
 * sources that started failing, most severe and most messages first. Broken
 * ingestion leads, since every other figure depends on it.
 */
export function buildActionQueue(input: TriageRuleInput): ActionItem[] {
  const hasPrevious = input.window.previous !== null
  const ingestion = ingestionActions(input.ingestion)
  const items: ActionItem[] = ingestion.filter((i) => i.severity !== 'critical')
  for (const domain of input.domains) {
    const silent = silentDomainAction(domain, input.window, input.todayDay)
    if (silent) items.push(silent)
    const compliance = domainComplianceAction(domain, hasPrevious)
    if (compliance) items.push(compliance)
  }
  items.push(...newFailingSourceActions(input.sources, hasPrevious))
  return [
    ...ingestion.filter((i) => i.severity === 'critical'),
    ...items.sort(compareActionItems),
  ]
}
