/** Stored GeoIP settings as the admin API reports them. */
export type GeoIpSettingsPublic = {
  hasLicenseKey: boolean
  geoipLastDbUpdateAt: string
  geoipLastDbUpdateError: string
}
