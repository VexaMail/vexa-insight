import { THIRTY_DAYS_MS } from './thirtyDaysMs'

/** True when the row's location was never resolved or is older than 30 days. */
export function isLocationStale(
  locationLastUpdate: Date | null,
  now: Date,
): boolean {
  return (
    !locationLastUpdate ||
    now.getTime() - locationLastUpdate.getTime() > THIRTY_DAYS_MS
  )
}
