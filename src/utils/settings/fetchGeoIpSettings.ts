import type { GeoIpSettingsPublic } from '@/types/settings'

/** Loads the stored GeoIP settings, or null when the request fails. */
export async function fetchGeoIpSettings(
  apiKey: string,
): Promise<GeoIpSettingsPublic | null> {
  try {
    const res = await fetch('/api/v1/admin/geoip/settings', {
      headers: { 'X-API-Key': apiKey },
    })
    const json = (await res.json()) as { data?: GeoIpSettingsPublic }
    return json.data ?? null
  } catch (err) {
    console.error(err)
    return null
  }
}
