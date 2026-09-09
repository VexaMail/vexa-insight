import type { normalizedEvents } from '@/lib/db'
import type { IpDateRange } from '@/types/filters'

export type IpEventConditionsInput = {
  readonly ip: string
  readonly allowedIds: number[] | null
  readonly dateRange: IpDateRange | undefined
  /** The event timestamp the date range is applied to. */
  readonly dateColumn:
    | typeof normalizedEvents.reportBeginDate
    | typeof normalizedEvents.reportEndDate
}
