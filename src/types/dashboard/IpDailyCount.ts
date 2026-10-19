import type { DailyCount } from './DailyCount'

/** A count for one sending IP on one UTC report day. */
export type IpDailyCount = DailyCount & {
  ip: string
}
