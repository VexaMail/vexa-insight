import { appSettings, getDb } from '@/lib/db'
import type { GeoIpAdminSettingsRow } from '@/types/settings'

/**
 * Reads the GeoIP-related fields from the app settings row, or null when
 * no settings row exists yet.
 */
export async function getGeoIpAdminSettings(): Promise<GeoIpAdminSettingsRow | null> {
  const db = getDb()
  const settingsResult = await db
    .select({
      geoipLastDbUpdateAt: appSettings.geoipLastDbUpdateAt,
      geoipLastDbUpdateError: appSettings.geoipLastDbUpdateError,
      licenseKey: appSettings.geoipMaxmindLicenseKey,
    })
    .from(appSettings)
    .limit(1)

  return settingsResult[0] ?? null
}
