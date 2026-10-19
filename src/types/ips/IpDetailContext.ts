import type { IpDateRange } from '@/types/filters'
import type { IpRawRecord } from '@/types/ip-detail'
import type { SenderIdentity } from '@/types/senders'
import type { SourceReview } from '@/types/source-reviews'
import type { TabNavItem } from '@/types/ui'
import type { IpLogRow } from '../IpLogRow'
import type { IpRelatedDomainRow } from '../IpRelatedDomainRow'
import type { IpRelatedReportRow } from '../IpRelatedReportRow'
import type { IpSummaryData } from '../IpSummaryData'
import type { IpAuthCheck } from './IpAuthCheck'
import type { IpDetailTab } from './IpDetailTab'
import type { IpDkimSignature } from './IpDkimSignature'
import type { IpEventFilter } from './IpEventFilter'
import type { IpMenuItem } from './IpMenuItem'
import type { IpTrendSeries } from './IpTrendSeries'
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
  /** The operator's verdicts on this source, one per reviewed domain. */
  readonly reviews: readonly SourceReview[]
  readonly trend: IpTrendSeries
  /** Loaded only for the raw data tab; null elsewhere. */
  readonly rawRecords: readonly IpRawRecord[] | null
  readonly tabs: Readonly<Record<IpDetailTab, TabNavItem>>
  /** Which events the overview stepper shows (`?events=`). */
  readonly eventFilter: IpEventFilter
  readonly eventFilterLinks: readonly IpMenuItem[]
}
