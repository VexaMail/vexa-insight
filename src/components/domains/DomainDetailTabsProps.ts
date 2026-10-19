import type { DomainDetailTab } from '@/types/domains'

export type DomainDetailTabsProps = {
  readonly domainName: string
  readonly active: DomainDetailTab
  readonly sourceCount: number
  readonly sourceDays: number | undefined
}
