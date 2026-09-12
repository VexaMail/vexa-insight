import type { AIProviderSettingsPublic } from '@/types/ai'
import type { ImapAccountPublic } from './ImapAccountPublic'
/**
 * Settings shape returned by GET /api/v1/admin/settings (secrets masked).
 */
export type SettingsPublic = {
  projectName: string
  apiV1Str: string
  imapAccounts: ImapAccountPublic[]
  ingestionIntervalMinutes: number
  ingestionDaysBack: number
  ingestionIncludeTrash: boolean
  ingestionIncludeAllFolders: boolean
  secretKeyMasked: boolean
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
  ai: AIProviderSettingsPublic
}
