import { appSettings, getDb } from '@/lib/db'
import { getConfig } from '@/services/config'
import { SETTINGS_ID } from '@/services/settings-store'
import type { SettingsUpdatePayload } from '@/types/settings'
import { eq } from 'drizzle-orm'
import { buildAppSettingsUpdates } from './buildAppSettingsUpdates'
import { syncImapAccounts } from './syncImapAccounts'

function updateSettings(payload: SettingsUpdatePayload): void {
  const db = getDb()

  db.update(appSettings)
    .set(buildAppSettingsUpdates(payload))
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()

  if (payload.imapAccounts === undefined) return

  const payloadSecret = (payload.secretKey ?? '').trim()
  syncImapAccounts(
    db,
    payload.imapAccounts,
    payloadSecret === '' ? getConfig().secretKey : payloadSecret,
  )
}

export { updateSettings }
