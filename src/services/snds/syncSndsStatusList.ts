import { parseSndsStatusRows } from '@/utils/snds'
import { fetchSndsReport } from './fetchSndsReport'
import { replaceSndsStatusRows } from './replaceSndsStatusRows'

/** Replaces the stored IP status list with the current one from SNDS. */
export async function syncSndsStatusList(
  accessToken: string,
  now: Date,
): Promise<number> {
  const status = await fetchSndsReport(accessToken, 'report/status/ip')
  return replaceSndsStatusRows(
    status.status === 'ok' ? parseSndsStatusRows(status.body) : [],
    now,
  )
}
