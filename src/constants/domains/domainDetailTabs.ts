import type { DomainDetailTabDef } from '@/types/domains'

/** The tabs of the domain page, in order. */
export const DOMAIN_DETAIL_TABS: readonly DomainDetailTabDef[] = [
  { key: 'sources', label: 'Sources' },
  { key: 'dns', label: 'DNS' },
  { key: 'reports', label: 'Reports' },
  { key: 'transport', label: 'TLS / RUF' },
]
