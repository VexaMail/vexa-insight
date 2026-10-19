import type { DomainDetailData, DomainDetailTab } from '@/types/domains'
import type { ReactNode } from 'react'

export type DomainDetailProps = {
  domainId: number
  domainName: string
  data: DomainDetailData
  tab: DomainDetailTab
  /** The DNS tab body, loaded live by the route only when it is open. */
  dnsSlot: ReactNode
  /** Receiver coverage shown on the Reports tab. */
  coverageSlot: ReactNode
  /** The History tab body, built only when it is open. */
  historySlot: ReactNode
}
