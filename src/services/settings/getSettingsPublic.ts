import { getImapAccountsRow, getSettingsRow } from '@/services/settings-store'
import type { SettingsPublic } from '@/types/settings'
import { getAiSettingsPublic } from './getAiSettingsPublic'

function getSettingsPublic(): SettingsPublic | null {
  const row = getSettingsRow()
  if (!row) return null
  const imapRows = getImapAccountsRow()
  const imapAccounts = imapRows.map((r) => ({
    id: r.id,
    label: r.label,
    server: r.server,
    port: r.port,
    username: r.username,
    passwordMasked: r.password.length > 0,
    fetchIncludeTrash: r.fetchIncludeTrash,
    fetchIncludeAllFolders: r.fetchIncludeAllFolders,
    postProcessAction: r.postProcessAction,
    postProcessFolder: r.postProcessFolder,
    moveToTrashAfterProcess: r.moveToTrashAfterProcess,
    markAsReadAfterProcess: r.markAsReadAfterProcess,
  }))
  return {
    projectName: row.projectName,
    apiV1Str: row.apiV1Str,
    imapAccounts,
    ingestionIntervalMinutes: row.ingestionIntervalMinutes,
    ingestionDaysBack: row.ingestionDaysBack,
    ingestionIncludeTrash: row.ingestionIncludeTrash,
    ingestionIncludeAllFolders: row.ingestionIncludeAllFolders,
    secretKeyMasked: row.secretKey.length > 0,
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
    ai: getAiSettingsPublic(),
  }
}

export { getSettingsPublic }
