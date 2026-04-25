export type SettingsRow = {
  apiV1Str: string
  ingestionIntervalMinutes: number
  ingestionDaysBack: number
  ingestionIncludeTrash: boolean
  ingestionIncludeAllFolders: boolean
  secretKey: string
  backendCorsOrigins: string
  environment: string
  ipHostnameLookupEnabled: boolean
  ipHostnameRefreshIntervalHours: number
  ipHostnameTimeoutMs: number
  ipHostnameMaxRetries: number
  ipHostnameRetryBackoffMinutes: number
  ipHostnameBatchSize: number
  ipHostnameManualRefreshEnabled: boolean
  ipHostnameAllowPrivateIps: boolean
  ipHostnameNegativeCacheHours: number
}
