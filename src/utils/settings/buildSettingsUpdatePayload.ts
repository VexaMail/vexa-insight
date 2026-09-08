import type { SettingsFormState } from '@/types/settings'
import { toImapAccountPayload } from './toImapAccountPayload'

/** Body of PUT /api/v1/admin/settings. A blank new secret is left out. */
export function buildSettingsUpdatePayload(
  form: SettingsFormState,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    imapAccounts: form.imapAccounts.map(toImapAccountPayload),
    ingestionIntervalMinutes: form.ingestionIntervalMinutes,
    ingestionDaysBack: form.ingestionDaysBack,
    ingestionIncludeTrash: form.ingestionIncludeTrash,
    ingestionIncludeAllFolders: form.ingestionIncludeAllFolders,
    backendCorsOrigins: form.backendCorsOrigins,
    environment: form.environment,
    ipHostnameLookupEnabled: form.ipHostnameLookupEnabled,
    ipHostnameRefreshIntervalHours: form.ipHostnameRefreshIntervalHours,
    ipHostnameTimeoutMs: form.ipHostnameTimeoutMs,
    ipHostnameMaxRetries: form.ipHostnameMaxRetries,
    ipHostnameRetryBackoffMinutes: form.ipHostnameRetryBackoffMinutes,
    ipHostnameBatchSize: form.ipHostnameBatchSize,
    ipHostnameManualRefreshEnabled: form.ipHostnameManualRefreshEnabled,
    ipHostnameAllowPrivateIps: form.ipHostnameAllowPrivateIps,
    ipHostnameNegativeCacheHours: form.ipHostnameNegativeCacheHours,
  }
  if (form.secretKeyNew.trim()) payload.secretKey = form.secretKeyNew

  return payload
}
