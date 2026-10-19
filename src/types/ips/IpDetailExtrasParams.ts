import type { IpDateRange } from '@/types/filters'

export type IpDetailExtrasParams = {
  readonly ip: string
  readonly dateRange: IpDateRange
  /** Reports whose XML the raw data tab reads; null skips that read. */
  readonly rawReportIds: readonly number[] | null
}
