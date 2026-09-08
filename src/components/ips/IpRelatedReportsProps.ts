import type { IpDateRange } from '@/types/filters'
import type { IpRelatedReportRow } from '@/types/IpRelatedReportRow'

export type IpRelatedReportsProps = {
  readonly initialReports: IpRelatedReportRow[]
  readonly ip: string
  readonly dateRange: IpDateRange
}
