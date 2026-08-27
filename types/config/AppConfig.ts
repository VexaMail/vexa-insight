import type { ImapAccountConfig } from './ImapAccountConfig'
/**
 * Application config shape loaded from validated env and DB.
 * One source of truth for runtime config consumed by the app.
 */
export type AppConfig = {
  projectName: string
  apiV1Str: string
  databaseUrl: string
  imapAccounts: ImapAccountConfig[]
  ingestionIntervalMinutes: number
  ingestionDaysBack: number
  ingestionIncludeTrash: boolean
  ingestionIncludeAllFolders: boolean
  secretKey: string
  backendCorsOrigins: string[]
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
