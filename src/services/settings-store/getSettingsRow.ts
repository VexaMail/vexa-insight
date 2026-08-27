import { appSettings, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { SETTINGS_ID } from './settingsId'

function getSettingsRow(): {
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
} | null {
  const db = getDb()
  const row = db
    .select()
    .from(appSettings)
    .where(eq(appSettings.id, SETTINGS_ID))
    .limit(1)
    .get()
  if (!row) return null
  return {
    apiV1Str: row.apiV1Str,
    ingestionIntervalMinutes: row.ingestionIntervalMinutes,
    ingestionDaysBack: row.ingestionDaysBack,
    ingestionIncludeTrash: row.ingestionIncludeTrash,
    ingestionIncludeAllFolders: row.ingestionIncludeAllFolders,
    secretKey: row.secretKey,
    backendCorsOrigins: row.backendCorsOrigins,
    environment: row.environment,
    ipHostnameLookupEnabled: row.ipHostnameLookupEnabled,
    ipHostnameRefreshIntervalHours: row.ipHostnameRefreshIntervalHours,
    ipHostnameTimeoutMs: row.ipHostnameTimeoutMs,
    ipHostnameMaxRetries: row.ipHostnameMaxRetries,
    ipHostnameRetryBackoffMinutes: row.ipHostnameRetryBackoffMinutes,
    ipHostnameBatchSize: row.ipHostnameBatchSize,
    ipHostnameManualRefreshEnabled: row.ipHostnameManualRefreshEnabled,
    ipHostnameAllowPrivateIps: row.ipHostnameAllowPrivateIps,
    ipHostnameNegativeCacheHours: row.ipHostnameNegativeCacheHours,
  }
}

export { getSettingsRow }
