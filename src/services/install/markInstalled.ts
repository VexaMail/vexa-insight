import { appSettings, getDb } from '@/lib/db'
import { SETTINGS_ID } from '@/services/settings-store'
import { eq } from 'drizzle-orm'

/**
 * Stamps the instance as installed.
 *
 * This is what `isInstalled` reads. It is deliberately separate from the root
 * secret: an instance whose key lives only in the environment leaves
 * `secret_key` at its placeholder and must still count as installed.
 */
export function markInstalled(): void {
  getDb()
    .update(appSettings)
    .set({ installedAt: new Date(), updatedAt: new Date() })
    .where(eq(appSettings.id, SETTINGS_ID))
    .run()
}
