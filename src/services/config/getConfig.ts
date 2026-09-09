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

  const config = rowToConfig(rowToUse, databaseUrl, imapRows)

  setCached(config)
  return config
}
