import { getCached, getDatabaseUrl, rowToConfig, setCached } from '@/lib/config'
import {
  getImapAccountsRow,
  getSettingsRow,
  purgeStoredSecretKey,
  resolveSecretKey,
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
  // Instances installed before 0.2.3 carry a copy of the environment's key in
  // the database; drop it before anything reads the row.
  purgeStoredSecretKey()
  const freshRow = getSettingsRow()
  const rowToUse = freshRow ?? row
  const imapRows = getImapAccountsRow()

  const config = rowToConfig(
    rowToUse,
    databaseUrl,
    imapRows,
    resolveSecretKey() ?? '',
  )

  setCached(config)
  return config
}
