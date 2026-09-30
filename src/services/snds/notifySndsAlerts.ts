import { fireAndForgetDispatch } from '@/services/notifications'
import type { SndsDataRow } from '@/types/snds'
import { isSndsAlertRow } from '@/utils/snds'

/** Dispatches `snds.reputation_alert` for a day with any flagged IP. */
export function notifySndsAlerts(
  reportDate: string,
  rows: readonly SndsDataRow[],
): void {
  const flagged = rows.filter(isSndsAlertRow)
  if (flagged.length === 0) return
  fireAndForgetDispatch('snds.reputation_alert', {
    reportDate,
    ips: flagged.map((row) => ({
      ip: row.ip,
      filterResult: row.filterResult,
      complaintRate: row.complaintRate,
      trapHits: row.trapHits,
      messageRecipients: row.messageRecipients,
    })),
  })
}
