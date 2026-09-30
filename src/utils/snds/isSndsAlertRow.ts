import { SNDS_COMPLAINT_ALERT_RATE } from '@/constants/snds'

/**
 * True when a day needs attention: Outlook.com rated the IP anything but
 * green, complaints went past the threshold, or spam traps were hit.
 */
export function isSndsAlertRow(
  row: Readonly<{
    filterResult: string | null
    complaintRate: number | null
    trapHits: number | null
  }>,
): boolean {
  if (row.filterResult !== null && row.filterResult !== 'GREEN') return true
  if (
    row.complaintRate !== null &&
    row.complaintRate > SNDS_COMPLAINT_ALERT_RATE
  )
    return true
  return (row.trapHits ?? 0) > 0
}
