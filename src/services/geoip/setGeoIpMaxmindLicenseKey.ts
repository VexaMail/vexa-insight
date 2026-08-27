import { appSettings, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'

/**
 * Stores the MaxMind license key on the app settings row. Returns false
 * when no settings row exists (nothing was updated).
 */
export async function setGeoIpMaxmindLicenseKey(
  licenseKey: string,
): Promise<boolean> {
  const db = getDb()
  const settingsResult = await db.select().from(appSettings).limit(1)
  const settings = settingsResult[0]
  if (!settings) {
    return false
  }

  await db
    .update(appSettings)
    .set({ geoipMaxmindLicenseKey: licenseKey, updatedAt: new Date() })
    .where(eq(appSettings.id, settings.id))

  return true
}
