import { appSettings, getDb } from '@/lib/db'
import { parseIngestionDaysBack } from '@/utils/install'
import { parseEnvironmentName } from '@/utils/settings'
import { eq } from 'drizzle-orm'
import { getSettingsRow } from './getSettingsRow'
import { SETTINGS_ID } from './settingsId'

/**
 * Copies the optional environment overrides into the settings row once, before
 * the instance is installed.
 *
 * `SECRET_KEY` is deliberately NOT among them. It is read straight from the
 * environment by `resolveSecretKey`, so writing it here would put the
 * encryption key inside the database it protects for no gain.
 */
function seedSettingsFromEnv(): void {
  const row = getSettingsRow()
  if (!row || row.installedAt !== null) return
  const env = process.env
  if (!env['SECRET_KEY'] || env['SECRET_KEY'].length < 32) return
  const db = getDb()
  const environment =
    parseEnvironmentName(env['ENVIRONMENT']) ?? row.environment
  db.update(appSettings)
    .set({
      apiV1Str: env['API_V1_STR'] ?? row.apiV1Str,
      ingestionIntervalMinutes: env['INGESTION_INTERVAL_MINUTES']
        ? parseInt(env['INGESTION_INTERVAL_MINUTES'], 10)
        : row.ingestionIntervalMinutes,
      ingestionDaysBack: env['INGESTION_DAYS_BACK']
        ? parseIngestionDaysBack(env['INGESTION_DAYS_BACK'])
        : row.ingestionDaysBack,
      backendCorsOrigins: env['BACKEND_CORS_ORIGINS'] ?? row.backendCorsOrigins,
      environment,
      updatedAt: new Date(),
    })
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()
}

export { seedSettingsFromEnv }
