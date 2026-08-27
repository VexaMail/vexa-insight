import type { ImapAccountUpdate } from './ImapAccountUpdate'
/**
 * Payload for PUT /api/v1/admin/settings. Omit or leave blank to keep current.
 */
export type SettingsUpdatePayload = {
  apiV1Str?: string | undefined
  imapAccounts?: ImapAccountUpdate[] | undefined
  ingestionIntervalMinutes?: number | undefined
  ingestionDaysBack?: number | undefined
  ingestionIncludeTrash?: boolean | undefined
  ingestionIncludeAllFolders?: boolean | undefined
  secretKey?: string | undefined
  backendCorsOrigins?: string | undefined
  environment?: string | undefined
  ipHostnameLookupEnabled?: boolean | undefined
  ipHostnameRefreshIntervalHours?: number | undefined
  ipHostnameTimeoutMs?: number | undefined
  ipHostnameMaxRetries?: number | undefined
  ipHostnameRetryBackoffMinutes?: number | undefined
  ipHostnameBatchSize?: number | undefined
  ipHostnameManualRefreshEnabled?: boolean | undefined
  ipHostnameAllowPrivateIps?: boolean | undefined
  ipHostnameNegativeCacheHours?: number | undefined
}
