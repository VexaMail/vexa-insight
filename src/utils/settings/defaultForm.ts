import { APP_NAME } from '@/lib/constants'
import type { SettingsFormState } from '@/types/settings'

export const DEFAULT_FORM: SettingsFormState = {
  projectName: APP_NAME,
  apiV1Str: '/api/v1',
  imapAccounts: [],
  ingestionIntervalMinutes: 60,
  ingestionDaysBack: 0,
  ingestionIncludeTrash: false,
  ingestionIncludeAllFolders: false,
  secretKeyMasked: false,
  backendCorsOrigins: '',
  environment: 'development',
  ipHostnameLookupEnabled: false,
  ipHostnameRefreshIntervalHours: 48,
  ipHostnameTimeoutMs: 2000,
  ipHostnameMaxRetries: 3,
  ipHostnameRetryBackoffMinutes: 60,
  ipHostnameBatchSize: 100,
  ipHostnameManualRefreshEnabled: true,
  ipHostnameAllowPrivateIps: false,
  ipHostnameNegativeCacheHours: 24,
  ai: {
    providerId: null,
    apiKeyMasked: null,
    model: null,
    isConfigured: false,
  },
}
