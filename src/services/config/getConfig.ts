import { getCached, getDatabaseUrl, rowToConfig, setCached } from '@/lib/config'
import {
  getImapAccountsRow,
  getSettingsRow,
  seedSettingsFromEnv,
} from '@/services/settings-store'
import type { AppConfig } from '@/types/config'

export function getConfig(): AppConfig {
  const existing = getCached()
  if (existing) return existing

  const databaseUrl = getDatabaseUrl()
  const row = getSettingsRow()
  if (!row) {
    throw new Error(
      'app_settings row not found. Run database migrations (pnpm run db:migrate).',
    )
  }

  seedSettingsFromEnv()
  const freshRow = getSettingsRow()
  const rowToUse = freshRow ?? row
  const imapRows = getImapAccountsRow()

  const config = rowToConfig(
    {
      apiV1Str: rowToUse.apiV1Str,
      ingestionIntervalMinutes: rowToUse.ingestionIntervalMinutes,
      ingestionDaysBack: rowToUse.ingestionDaysBack,
      ingestionIncludeTrash: rowToUse.ingestionIncludeTrash,
      ingestionIncludeAllFolders: rowToUse.ingestionIncludeAllFolders,
      secretKey: rowToUse.secretKey,
      backendCorsOrigins: rowToUse.backendCorsOrigins,
      environment: rowToUse.environment,
      ipHostnameLookupEnabled: rowToUse.ipHostnameLookupEnabled,
      ipHostnameRefreshIntervalHours: rowToUse.ipHostnameRefreshIntervalHours,
      ipHostnameTimeoutMs: rowToUse.ipHostnameTimeoutMs,
      ipHostnameMaxRetries: rowToUse.ipHostnameMaxRetries,
      ipHostnameRetryBackoffMinutes: rowToUse.ipHostnameRetryBackoffMinutes,
      ipHostnameBatchSize: rowToUse.ipHostnameBatchSize,
      ipHostnameManualRefreshEnabled: rowToUse.ipHostnameManualRefreshEnabled,
      ipHostnameAllowPrivateIps: rowToUse.ipHostnameAllowPrivateIps,
      ipHostnameNegativeCacheHours: rowToUse.ipHostnameNegativeCacheHours,
    },
    databaseUrl,
    imapRows.map((r) => ({
      id: r.id,
      server: r.server,
      port: r.port,
      username: r.username,
      password: r.password,
      fetchIncludeTrash: r.fetchIncludeTrash,
      fetchIncludeAllFolders: r.fetchIncludeAllFolders,
      postProcessAction: r.postProcessAction,
      postProcessFolder: r.postProcessFolder,
      moveToTrashAfterProcess: r.moveToTrashAfterProcess,
      markAsReadAfterProcess: r.markAsReadAfterProcess,
    })),
  )

  setCached(config)
  return config
}
