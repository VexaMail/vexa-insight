import type { IpDateRange } from '@/types/filters'
import type { IpLogRow } from '@/types/IpLogRow'
import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import type { IpRelatedReportRow } from '@/types/IpRelatedReportRow'

export type IpDetailPanelsProps = {
  readonly ip: string
  readonly dateRange: IpDateRange
  readonly domains: IpRelatedDomainRow[] | null
  readonly reports: IpRelatedReportRow[] | null
  readonly logs: IpLogRow[] | null
}
