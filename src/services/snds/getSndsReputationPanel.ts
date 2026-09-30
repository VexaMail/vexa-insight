import type { SndsReputationPanelData } from '@/types/snds'
import { getSndsConnectionRow } from './getSndsConnectionRow'
import { listSndsLatestByIp } from './listSndsLatestByIp'
import { listSndsStatusRows } from './listSndsStatusRows'

/**
 * SNDS data for the IPs page, or null when SNDS was never connected and has
 * nothing stored, so the page shows no empty card to instances not using it.
 */
export function getSndsReputationPanel(): SndsReputationPanelData | null {
  const rows = listSndsLatestByIp()
  if (rows.length === 0 && !getSndsConnectionRow()?.refreshTokenEncrypted) {
    return null
  }
  return { rows, statusRows: listSndsStatusRows() }
}
