import type {
  ChangeItem,
  DayRange,
  DomainPeriodTotals,
} from '@/types/dashboard'
import { changeSubject } from './changeSubject'
import { isAddedInRange } from './isAddedInRange'
import { nameList } from './nameList'
import { newestSeconds } from './newestSeconds'

/** Domains first seen during the current period. */
export function addedDomainsChange(
  domains: DomainPeriodTotals[],
  range: DayRange,
): ChangeItem | null {
  const added = domains.filter((d) => isAddedInRange(d, range))
  if (added.length === 0) return null
  return {
    id: 'domains-added',
    value: `+${String(added.length)}`,
    title: `New ${added.length === 1 ? 'domain' : 'domains'} added`,
    subject: changeSubject(
      added.map((d) => d.domainName),
      'domain',
    ),
    detail: nameList(added.map((d) => d.domainName)),
    direction: 'neutral',
    isNew: true,
    lastSeenAt: newestSeconds(
      added.map((d) => Math.floor(d.createdAtMs / 1000)),
    ),
    href: '/domains',
  }
}
