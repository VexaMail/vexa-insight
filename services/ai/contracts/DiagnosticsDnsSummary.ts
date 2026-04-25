/** Normalized DNS data for the diagnostics AI prompt. */
export type DiagnosticsDnsSummary = {
  spfRecord: string | null
  spfValid: boolean
  spfWarning: string | null
  spfCategories: {
    category: string
    checks: { name: string; passed: boolean; detail: string }[]
  }[]
  dmarcRecord: string | null
  dmarcPolicy: string | null
  dmarcValid: boolean
  dmarcWarnings: string[]
  dmarcTags: { tag: string; value: string; description: string }[]
  dkimSelectors: {
    selector: string
    valid: boolean
    record: string | null
    keyType: string | null
    keyLengthBits: number | null
    publicKeyPresent: boolean
    errors: string[]
  }[]
  mxHosts: string[]
  aRecords: string[]
  nsRecords: string[]
  bimiRecord: string | null
  bimiValid: boolean
  bimiLogoUrl: string | null
  bimiCertificateUrl: string | null
  mtaStsRecord: string | null
  mtaStsValid: boolean
  mtaStsPolicyAccessible: boolean
  mtaStsMode: string | null
  mtaStsMxRecords: string[]
  tlsRptRecord: string | null
  tlsRptValid: boolean
  tlsRptRuaAddresses: string[]
}
