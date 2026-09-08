import { getConfig } from '@/services/config'
import type { ComputeLookupScheduleInput } from './ComputeLookupScheduleInput'
import type { HostnameLookupSchedule } from './HostnameLookupSchedule'
import { hoursFromNow } from './hoursFromNow'

/**
 * Success refreshes on the normal interval and clears the retry counter; a
 * definitive miss uses the negative cache; a failure backs off linearly until
 * the retry budget runs out, then falls back to the negative cache.
 */
export function computeLookupSchedule({
  status,
  now,
  previousRetryCount,
  previousSuccessAt,
}: ComputeLookupScheduleInput): HostnameLookupSchedule {
  const config = getConfig()

  if (status === 'success') {
    return {
      retryCount: 0,
      lastSuccessAt: now,
      nextLookupAt: hoursFromNow(now, config.ipHostnameRefreshIntervalHours),
    }
  }

  if (status === 'not_found') {
    return {
      retryCount: 0,
      lastSuccessAt: previousSuccessAt,
      nextLookupAt: hoursFromNow(now, config.ipHostnameNegativeCacheHours),
    }
  }

  const retryCount = previousRetryCount + 1
  if (retryCount > config.ipHostnameMaxRetries) {
    return {
      retryCount: 0,
      lastSuccessAt: previousSuccessAt,
      nextLookupAt: hoursFromNow(now, config.ipHostnameNegativeCacheHours),
    }
  }

  return {
    retryCount,
    lastSuccessAt: previousSuccessAt,
    nextLookupAt: new Date(
      now.getTime() +
        config.ipHostnameRetryBackoffMinutes * 60 * 1000 * retryCount,
    ),
  }
}
