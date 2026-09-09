import { appSettings, getDb } from '@/lib/db'
import { parseIngestionDaysBack } from '@/utils/install'
import { parseEnvironmentName } from '@/utils/settings'
import { eq } from 'drizzle-orm'
import { getSettingsRow } from './getSettingsRow'
import { SETTINGS_ID } from './settingsId'

/**
 * If the current row has secretKey === 'CHANGE_ME' and env has SECRET_KEY (and
 * optionally other vars), update the row once from env for backward compatibility.
 */
function seedSettingsFromEnv(): void {
  const row = getSettingsRow()
  if (!row || row.secretKey !== 'CHANGE_ME') return
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
      secretKey: env['SECRET_KEY'],
      backendCorsOrigins: env['BACKEND_CORS_ORIGINS'] ?? row.backendCorsOrigins,
      environment,
      updatedAt: new Date(),
    })
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()
}

export { seedSettingsFromEnv }
