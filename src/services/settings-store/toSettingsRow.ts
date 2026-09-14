import type { appSettings } from '@/lib/db'
import type { SettingsRow } from '@/types/config'

export function toSettingsRow(
  row: typeof appSettings.$inferSelect,
): SettingsRow {
  return {
    projectName: row.projectName,
    apiV1Str: row.apiV1Str,
    ingestionIntervalMinutes: row.ingestionIntervalMinutes,
    ingestionDaysBack: row.ingestionDaysBack,
    ingestionIncludeTrash: row.ingestionIncludeTrash,
    ingestionIncludeAllFolders: row.ingestionIncludeAllFolders,
    secretKey: row.secretKey,
    installedAt: row.installedAt,
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
