import type { sndsIpStatus } from '@/lib/db'
import type { SndsLatestIpRow } from './SndsLatestIpRow'

/** What the IPs page shows from SNDS: the latest day per IP and the status list. */
export type SndsReputationPanelData = {
  readonly rows: readonly SndsLatestIpRow[]
  readonly statusRows: readonly (typeof sndsIpStatus.$inferSelect)[]
}
