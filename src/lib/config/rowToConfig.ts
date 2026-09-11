import { APP_NAME } from '@/lib/constants'
import type { AppConfig, ImapAccountConfig } from '@/types/config'
import { parseIngestionDaysBack } from '@/utils/install'
import type { ImapRow } from './ImapRow'
import type { SettingsRow } from './SettingsRow'

function rowToConfig(
  row: SettingsRow,
  databaseUrl: string,
  imapRows: ImapRow[],
  secretKey: string,
): AppConfig {
  const corsOrigins = row.backendCorsOrigins
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const imapAccounts: ImapAccountConfig[] = imapRows
    .filter((r) => r.server && r.username && r.password)
    .map((r) => ({
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
    }))
  return {
    projectName: APP_NAME,
    apiV1Str: row.apiV1Str,
    databaseUrl,
    imapAccounts,
    ingestionIntervalMinutes: row.ingestionIntervalMinutes,
    // Scheduled runs always use a bounded window; a stored 0 (the pre-0030
    // "no limit" default, or a hand-edited row) would re-scan every message.
    ingestionDaysBack: parseIngestionDaysBack(row.ingestionDaysBack),
    ingestionIncludeTrash: row.ingestionIncludeTrash,
    ingestionIncludeAllFolders: row.ingestionIncludeAllFolders,
    secretKey,
    backendCorsOrigins:
      corsOrigins.length > 0 ? corsOrigins : ['http://localhost:3000'],
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

export { rowToConfig }
