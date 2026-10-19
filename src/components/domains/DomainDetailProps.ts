import type { DomainDetailData, DomainDetailTab } from '@/types/domains'
import type { ReactNode } from 'react'

export type DomainDetailProps = {
  domainId: number
  domainName: string
  data: DomainDetailData
  tab: DomainDetailTab
  /** The DNS tab body, loaded live by the route only when it is open. */
  dnsSlot: ReactNode
}
