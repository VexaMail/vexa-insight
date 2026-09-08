/** One normalized event of the report-sources fixture. */
export type SeedEventInput = {
  ipAddressId: number
  spfResult: string
  dkimResult: string
  aligned: boolean
  disposition: string
  count: number
}
