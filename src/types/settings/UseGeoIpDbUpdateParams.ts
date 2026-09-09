export type UseGeoIpDbUpdateParams = {
  readonly apiKey: string
  readonly canUpdate: boolean
  readonly setMessage: (message: string) => void
  readonly onUpdated: () => void
}
