import { getConfig } from '@/services/config'
import { getSndsConnectionRow, syncSnds } from '@/services/snds'

/** Scheduled SNDS sync: skipped quietly while SNDS is not connected. */
export async function runScheduledSndsSync(): Promise<void> {
  if (!getSndsConnectionRow()?.refreshTokenEncrypted) return
  try {
    const result = await syncSnds(getConfig().secretKey)
    console.info(
      `[snds] sync: status=${result.status} days=${String(result.daysFetched)} rows=${String(result.rowsStored)} statusRows=${String(result.statusRows)}`,
    )
    if (result.error) console.error('[snds] sync failed:', result.error)
  } catch (e) {
    console.error('[snds] Unhandled error in scheduled sync', e)
  }
}
