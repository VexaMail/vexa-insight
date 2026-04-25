import { z } from 'zod'
import { imapAccountSchema } from './imapAccountSchema'

export const settingsUpdateSchema = z.object({
  apiV1Str: z.string().min(1).optional(),
  imapAccounts: z.array(imapAccountSchema).optional(),
  ingestionIntervalMinutes: z.number().int().min(1).max(1440).optional(),
  ingestionDaysBack: z.number().int().min(0).max(365).optional(),
  ingestionIncludeTrash: z.boolean().optional(),
  ingestionIncludeAllFolders: z.boolean().optional(),
  secretKey: z.string().min(32).optional(),
  backendCorsOrigins: z.string().optional(),
  environment: z.enum(['development', 'staging', 'production']).optional(),

  ipHostnameLookupEnabled: z.boolean().optional(),
  ipHostnameRefreshIntervalHours: z.number().int().min(1).max(8760).optional(),
  ipHostnameTimeoutMs: z.number().int().min(100).max(60000).optional(),
  ipHostnameMaxRetries: z.number().int().min(0).max(10).optional(),
  ipHostnameRetryBackoffMinutes: z.number().int().min(1).max(1440).optional(),
  ipHostnameBatchSize: z.number().int().min(1).max(1000).optional(),
  ipHostnameManualRefreshEnabled: z.boolean().optional(),
  ipHostnameAllowPrivateIps: z.boolean().optional(),
  ipHostnameNegativeCacheHours: z.number().int().min(1).max(8760).optional(),
})
