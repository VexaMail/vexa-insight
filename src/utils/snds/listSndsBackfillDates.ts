import { SNDS_DAY_MS } from '@/constants/snds'
import { formatSndsDate } from '../../formatters/snds/formatSndsDate'

/**
 * The past days, newest first, that a sync should fetch: from yesterday back
 * `days` days, skipping those already stored.
 */
export function listSndsBackfillDates(
  now: Date,
  days: number,
  stored: ReadonlySet<string>,
): string[] {
  const dates: string[] = []
  for (let offset = 1; offset <= days; offset += 1) {
    const date = formatSndsDate(new Date(now.getTime() - offset * SNDS_DAY_MS))
    if (!stored.has(date)) dates.push(date)
  }
  return dates
}
