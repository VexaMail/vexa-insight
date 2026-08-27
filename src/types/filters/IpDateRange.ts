export type IpDateRange = {
  readonly fromDate?: Date | undefined
  readonly toDate?: Date | undefined
  readonly fromTs?: number | undefined
  readonly toTs?: number | undefined
  readonly hasDateFilter: boolean
}
