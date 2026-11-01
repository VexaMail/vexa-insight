import { SNDS_BACKFILL_DAYS } from '@/constants/snds'
import { listSndsBackfillDates, parseSndsDataRows } from '@/utils/snds'
import { fetchSndsReport } from './fetchSndsReport'
import { listStoredSndsDates } from './listStoredSndsDates'
import { notifySndsAlerts } from './notifySndsAlerts'
import { upsertSndsDataRows } from './upsertSndsDataRows'

/**
 * Fetches every day of the last month that is not stored yet. Days SNDS has
 * nothing for (404) are skipped and retried on the next run, since data can
 * appear late. A day SNDS answers with an error (it returns sporadic 500s) is
 * reported in `failedDates` and retried the same way, without dropping the
 * days after it.
 */
export async function backfillSndsDays(
  accessToken: string,
  now: Date,
): Promise<{
  daysFetched: number
  rowsStored: number
  failedDates: string[]
}> {
  let daysFetched = 0
  let rowsStored = 0
  const failedDates: string[] = []
  const dates = listSndsBackfillDates(
    now,
    SNDS_BACKFILL_DAYS,
    listStoredSndsDates(),
  )
  for (const date of dates) {
    let result
    try {
      result = await fetchSndsReport(accessToken, `report/data/${date}`)
    } catch {
      failedDates.push(date)
      continue
    }
    if (result.status === 'no-data') continue
    const rows = parseSndsDataRows(result.body)
    daysFetched += 1
    rowsStored += upsertSndsDataRows(date, rows, now)
    notifySndsAlerts(date, rows)
  }
  return { daysFetched, rowsStored, failedDates }
}
