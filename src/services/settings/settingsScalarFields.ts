import type { SettingsUpdatePayload } from '@/types/settings'

/**
 * Scalar columns of `app_settings` copied straight from the update payload.
 * `secretKey` and `imapAccounts` are excluded: both need extra handling.
 */
export const settingsScalarFields: readonly (keyof SettingsUpdatePayload)[] = [
  'apiV1Str',
  'ingestionIntervalMinutes',
  'ingestionDaysBack',
  'ingestionIncludeTrash',
  'ingestionIncludeAllFolders',
  'backendCorsOrigins',
  'environment',
  'ipHostnameLookupEnabled',
  'ipHostnameRefreshIntervalHours',
  'ipHostnameTimeoutMs',
  'ipHostnameMaxRetries',
  'ipHostnameRetryBackoffMinutes',
  'ipHostnameBatchSize',
  'ipHostnameManualRefreshEnabled',
  'ipHostnameAllowPrivateIps',
  'ipHostnameNegativeCacheHours',
]
