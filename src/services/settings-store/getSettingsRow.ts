import { appSettings, getDb } from '@/lib/db'
import type { SettingsRow } from '@/types/config'
import { eq } from 'drizzle-orm'
import { SETTINGS_ID } from './settingsId'
import { toSettingsRow } from './toSettingsRow'

function getSettingsRow(): SettingsRow | null {
  const db = getDb()
  const row = db
    .select()
    .from(appSettings)
    .where(eq(appSettings.id, SETTINGS_ID))
    .limit(1)
    .get()
  return row ? toSettingsRow(row) : null
}

export { getSettingsRow }
