import { TabNav } from '@/components/ui'
import { DOMAIN_DETAIL_TABS } from '@/constants/domains'
import { domainTabHref } from '@/utils/domains'
import type { DomainDetailTabsProps } from './DomainDetailTabsProps'

/** Sources, DNS, Reports and TLS / RUF, each its own `?tab=` URL. */
export function DomainDetailTabs({
  domainName,
  active,
  sourceCount,
  sourceDays,
}: Readonly<DomainDetailTabsProps>) {
  const window = sourceDays == null ? {} : { days: String(sourceDays) }
  const items = DOMAIN_DETAIL_TABS.map((tab) => ({
    key: tab.key,
    label: tab.label,
    href: domainTabHref(
      domainName,
      tab.key,
      tab.key === 'sources' ? window : {},
    ),
    ...(tab.key === 'sources' ? { count: sourceCount } : {}),
  }))
  return <TabNav items={items} active={active} label="Domain sections" />
}
