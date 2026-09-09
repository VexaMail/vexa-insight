import { appSettings, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'

/**
 * Stamps the settings row with the updater's result. Resolves to null on a
 * clean exit, otherwise to the error message that was stored.
 */
export async function recordGeoIpUpdateOutcome(
  settingsId: number,
  code: number | null,
): Promise<string | null> {
  const db = getDb()
  if (code === 0) {
    await db
      .update(appSettings)
      .set({ geoipLastDbUpdateAt: new Date(), geoipLastDbUpdateError: null })
      .where(eq(appSettings.id, settingsId))
    return null
  }

  const errStr = `Updater exited with code ${String(code)}`
  await db
    .update(appSettings)
    .set({ geoipLastDbUpdateError: errStr })
    .where(eq(appSettings.id, settingsId))
  return errStr
}
