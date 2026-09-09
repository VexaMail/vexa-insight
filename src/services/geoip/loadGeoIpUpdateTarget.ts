import { appSettings, getDb } from '@/lib/db'
import type { GeoIpUpdateTarget } from './GeoIpUpdateTarget'

/** The settings row to stamp and the MaxMind key to download with. */
export async function loadGeoIpUpdateTarget(
  licenseKey: string | undefined,
): Promise<GeoIpUpdateTarget> {
  const db = getDb()
  const settingsResult = await db.select().from(appSettings).limit(1)
  const settings = settingsResult[0]
  if (!settings) throw new Error('Settings not found')

  const keyToUse = licenseKey ?? settings.geoipMaxmindLicenseKey
  if (!keyToUse) throw new Error('MaxMind License Key is missing')

  return { settingsId: settings.id, licenseKey: keyToUse }
}
