import type { SndsSyncResult } from '@/types/snds'
import { backfillSndsDays } from './backfillSndsDays'
import { getSndsAccessToken } from './getSndsAccessToken'
import { getSndsConnectionRow } from './getSndsConnectionRow'
import { saveSndsConnection } from './saveSndsConnection'
import { syncSndsStatusList } from './syncSndsStatusList'

/**
 * Pulls Microsoft SNDS data: every missing day of the last month, then the
 * current IP status list. The outcome is recorded on the connection row for
 * Settings.
 */
export async function syncSnds(
  secretKey: string,
  now: Date = new Date(),
): Promise<SndsSyncResult> {
  if (!getSndsConnectionRow()?.refreshTokenEncrypted) {
    return {
      status: 'not-connected',
      daysFetched: 0,
      rowsStored: 0,
      statusRows: 0,
      error: null,
    }
  }
  try {
    const accessToken = await getSndsAccessToken(secretKey)
    const { daysFetched, rowsStored } = await backfillSndsDays(accessToken, now)
    const statusRows = await syncSndsStatusList(accessToken, now)
    const status = rowsStored > 0 || statusRows > 0 ? 'ok' : 'no-data'
    saveSndsConnection({
      lastSyncAt: now,
      lastSyncStatus: status,
      lastSyncError: null,
    })
    return { status, daysFetched, rowsStored, statusRows, error: null }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    saveSndsConnection({
      lastSyncAt: now,
      lastSyncStatus: 'error',
      lastSyncError: error,
    })
    return {
      status: 'error',
      daysFetched: 0,
      rowsStored: 0,
      statusRows: 0,
      error,
    }
  }
}
