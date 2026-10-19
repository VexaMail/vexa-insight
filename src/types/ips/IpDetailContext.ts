import type { IpDateRange } from '@/types/filters'
import type { SenderIdentity } from '@/types/senders'
import type { TabNavItem } from '@/types/ui'
import type { IpLogRow } from '../IpLogRow'
import type { IpRelatedDomainRow } from '../IpRelatedDomainRow'
import type { IpRelatedReportRow } from '../IpRelatedReportRow'
import type { IpSummaryData } from '../IpSummaryData'
import type { IpAuthCheck } from './IpAuthCheck'
import type { IpDetailTab } from './IpDetailTab'
import type { IpDkimSignature } from './IpDkimSignature'
import type { SourceCause } from './SourceCause'

/** Everything a source's page renders, loaded once by the route. */
export type IpDetailContext = {
  readonly ip: string
  readonly dateRange: IpDateRange
  readonly data: IpSummaryData
  readonly cause: SourceCause
  readonly checks: readonly IpAuthCheck[]
  readonly sender: SenderIdentity | null
  readonly dkimSignatures: readonly IpDkimSignature[]
  readonly domains: IpRelatedDomainRow[] | null
  readonly reports: IpRelatedReportRow[] | null
  readonly logs: IpLogRow[] | null
  readonly tabs: Readonly<Record<IpDetailTab, TabNavItem>>
}
