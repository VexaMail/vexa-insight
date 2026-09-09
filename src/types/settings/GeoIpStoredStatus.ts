/** The MaxMind settings the server reports, plus the setters the UI updates. */
export type GeoIpStoredStatus = {
  readonly hasLicenseKey: boolean
  readonly setHasLicenseKey: (has: boolean) => void
  readonly lastUpdate: string | null
  readonly setLastUpdate: (at: string | null) => void
  readonly errorStatus: string | null
  readonly setErrorStatus: (error: string | null) => void
}
