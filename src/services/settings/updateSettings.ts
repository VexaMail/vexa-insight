import { appSettings, getDb } from '@/lib/db'
import { getConfig } from '@/services/config'
import { SETTINGS_ID } from '@/services/settings-store'
import type { SettingsUpdatePayload } from '@/types/settings'
import { eq } from 'drizzle-orm'
import { buildAppSettingsUpdates } from './buildAppSettingsUpdates'
import { reencryptStoredSecrets } from './reencryptStoredSecrets'
import { syncImapAccounts } from './syncImapAccounts'

function updateSettings(payload: SettingsUpdatePayload): void {
  const db = getDb()
  const payloadSecret = (payload.secretKey ?? '').trim()
  const previousSecret = getConfig().secretKey

  // Every stored secret is encrypted with a key derived from this one, so the
  // rotation has to carry them over before the old key is gone.
  if (payloadSecret !== '' && payloadSecret !== previousSecret) {
    reencryptStoredSecrets(previousSecret, payloadSecret)
  }

  db.update(appSettings)
    .set(buildAppSettingsUpdates(payload))
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()

  if (payload.imapAccounts === undefined) return

  syncImapAccounts(
    db,
    payload.imapAccounts,
    payloadSecret === '' ? previousSecret : payloadSecret,
  )
}

export { updateSettings }
