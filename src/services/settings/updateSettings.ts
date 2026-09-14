import { invalidateConfigCache } from '@/lib/config'
import { appSettings, getDb } from '@/lib/db'
import { getConfig } from '@/services/config'
import { SETTINGS_ID } from '@/services/settings-store'
import type { SettingsUpdatePayload } from '@/types/settings'
import { eq } from 'drizzle-orm'
import { buildAppSettingsUpdates } from './buildAppSettingsUpdates'
import { syncImapAccounts } from './syncImapAccounts'

/**
 * Applies a settings payload.
 *
 * Rotating the encryption root is deliberately not part of this: the key comes
 * from the environment (ADR 0010), which a running instance cannot change for
 * itself. Rotation is `recovery.ts rotate-key`, run with the instance stopped.
 */
function updateSettings(payload: SettingsUpdatePayload): void {
  const db = getDb()

  db.update(appSettings)
    .set(buildAppSettingsUpdates(payload))
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()

  if (payload.imapAccounts !== undefined) {
    syncImapAccounts(db, payload.imapAccounts, getConfig().secretKey)
  }

  invalidateConfigCache()
}

export { updateSettings }
