/**
 * Fields read from an MTA-STS policy file body.
 */
export type MtaStsPolicyFields = {
  mode: string | null
  fileAge: string | null
  mxRecords: string[]
}
