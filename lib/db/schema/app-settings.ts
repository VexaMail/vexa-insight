import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Single-row table for application configuration (id = 1).
 * Replaces env-based config; only DATABASE_URL remains in env.
 */
export const appSettings = sqliteTable('app_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectName: text('project_name').notNull().default('Vexa Mail Insight'),
  apiV1Str: text('api_v1_str').notNull().default('/api/v1'),
  ingestionIntervalMinutes: integer('ingestion_interval_minutes')
    .notNull()
    .default(60),
  ingestionDaysBack: integer('ingestion_days_back').notNull().default(0),
  ingestionIncludeTrash: integer('ingestion_include_trash', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
  ingestionIncludeAllFolders: integer('ingestion_include_all_folders', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
  secretKey: text('secret_key').notNull().default('CHANGE_ME'),
  backendCorsOrigins: text('backend_cors_origins')
    .notNull()
    .default('http://localhost:3000'),
  environment: text('environment').notNull().default('development'),
  geoipMaxmindLicenseKey: text('geoip_maxmind_license_key'),
  geoipLastDbUpdateAt: integer('geoip_last_db_update_at', {
    mode: 'timestamp',
  }),
  geoipLastDbUpdateError: text('geoip_last_db_update_error'),

  ipHostnameLookupEnabled: integer('ip_hostname_lookup_enabled', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
  ipHostnameRefreshIntervalHours: integer('ip_hostname_refresh_interval_hours')
    .notNull()
    .default(48),
  ipHostnameTimeoutMs: integer('ip_hostname_timeout_ms')
    .notNull()
    .default(5000),
  ipHostnameMaxRetries: integer('ip_hostname_max_retries').notNull().default(3),
  ipHostnameRetryBackoffMinutes: integer('ip_hostname_retry_backoff_minutes')
    .notNull()
    .default(15),
  ipHostnameBatchSize: integer('ip_hostname_batch_size').notNull().default(100),
  ipHostnameManualRefreshEnabled: integer(
    'ip_hostname_manual_refresh_enabled',
    {
      mode: 'boolean',
    },
  )
    .notNull()
    .default(true),
  ipHostnameAllowPrivateIps: integer('ip_hostname_allow_private_ips', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
  ipHostnameNegativeCacheHours: integer('ip_hostname_negative_cache_hours')
    .notNull()
    .default(48),

  aiProviderId: text('ai_provider_id'),
  aiApiKeyEncrypted: text('ai_api_key_encrypted'),
  aiApiKeyIv: text('ai_api_key_iv'),
  aiModel: text('ai_model'),

  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
