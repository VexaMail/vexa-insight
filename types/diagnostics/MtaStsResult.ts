export type MtaStsResult = {
  raw: string | null
  valid: boolean
  policyFileAccessible: boolean
  policyHost: string | null
  mode: string | null
  fileAge: string | null
  mxRecords: string[]
}
