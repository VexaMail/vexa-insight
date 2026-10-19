import type { IpDateRange } from '@/types/filters'
import type { IpRawRecord } from '@/types/ip-detail'
import type { SenderIdentity } from '@/types/senders'
import type { SourceReview } from '@/types/source-reviews'
import type { IpLogRow } from '../IpLogRow'
import type { IpRelatedDomainRow } from '../IpRelatedDomainRow'
import type { IpRelatedReportRow } from '../IpRelatedReportRow'
import type { IpSummaryData } from '../IpSummaryData'
import type { IpDailyPoint } from './IpDailyPoint'
import type { IpDkimSignature } from './IpDkimSignature'
import type { SearchParamsRecord } from './SearchParamsRecord'

export type BuildIpDetailContextParams = {
  readonly ip: string
  readonly basePath: string
  readonly searchParams: SearchParamsRecord
  readonly dateRange: IpDateRange
  readonly data: IpSummaryData
  readonly sender: SenderIdentity | null
  readonly dkimSignatures: readonly IpDkimSignature[]
  readonly domains: IpRelatedDomainRow[] | null
  readonly reports: IpRelatedReportRow[] | null
  readonly logs: IpLogRow[] | null
  readonly reviews: readonly SourceReview[]
  readonly daily: readonly IpDailyPoint[]
  readonly rawRecords: readonly IpRawRecord[] | null
}
