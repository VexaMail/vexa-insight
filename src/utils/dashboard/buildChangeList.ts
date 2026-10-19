import type { ChangeItem, TriageRuleInput } from '@/types/dashboard'
import { addedDomainsChange } from './addedDomainsChange'
import { failedMessageMovers } from './failedMessageMovers'
import { failureRateChange } from './failureRateChange'
import { newFailingSourcesChange } from './newFailingSourcesChange'
import { nowCompliantChange } from './nowCompliantChange'

/**
 * "What changed since the previous period": the current window against the
 * window of the same length right before it. Empty for the all-time range.
 */
export function buildChangeList(input: TriageRuleInput): ChangeItem[] {
  if (input.window.previous === null) return []
  const items = [
    ...failedMessageMovers(input.domains),
    newFailingSourcesChange(input.sources),
    failureRateChange(input.domains),
    addedDomainsChange(input.domains, input.window.current),
    nowCompliantChange(input.domains),
  ]
  return items.filter((item): item is ChangeItem => item !== null)
}
