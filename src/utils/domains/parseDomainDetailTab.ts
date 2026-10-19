import { DOMAIN_DETAIL_TABS } from '@/constants/domains'
import type { DomainDetailTab } from '@/types/domains'

/** The `?tab=` value as a tab of the domain page; sources by default. */
export function parseDomainDetailTab(
  value: string | string[] | undefined,
): DomainDetailTab {
  const tab = DOMAIN_DETAIL_TABS.find((t) => t.key === value)
  return tab?.key ?? 'sources'
}
