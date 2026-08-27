/**
 * GeoIP-related fields read from the app settings row for the admin
 * geoip/settings endpoint. `licenseKey` is the raw stored key; the route
 * only exposes whether one is present.
 */
export type GeoIpAdminSettingsRow = {
  geoipLastDbUpdateAt: Date | null
  geoipLastDbUpdateError: string | null
  licenseKey: string | null
}
