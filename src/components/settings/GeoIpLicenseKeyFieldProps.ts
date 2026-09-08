export type GeoIpLicenseKeyFieldProps = {
  readonly licenseKey: string
  readonly hasLicenseKey: boolean
  readonly isLoading: boolean
  readonly onChange: (value: string) => void
  readonly onSave: () => void
}
