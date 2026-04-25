import type { BimiResult } from './BimiResult'
import type { DkimParsedRecord } from './DkimParsedRecord'
import type { DmarcTagInfo } from './DmarcTagInfo'
import type { MtaStsResult } from './MtaStsResult'
import type { SpfValidationCategory } from './SpfValidationCategory'
import type { TlsRptResult } from './TlsRptResult'

export type { BimiResult } from './BimiResult'
export type { DiagnosticsAdminGuide } from './DiagnosticsAdminGuide'
export type { DkimParsedRecord } from './DkimParsedRecord'
export type { DmarcTagInfo } from './DmarcTagInfo'
export type { DomainScore } from './DomainScore'
export type { MtaStsResult } from './MtaStsResult'
export type { TlsRptResult } from './TlsRptResult'
export type { UseDiagnosticsViewReturn } from './UseDiagnosticsViewReturn'

export type DiagnosticStats = {
  totalEvents: number
  failedEvents: number

  // Alignment issues (denominator: all events or all passing auth)
  spf_pass_unaligned: number
  dkim_pass_unaligned: number

  // Auth failures (denominator: failed auth events)
  spf_auth_fail: number // Catch-all for failed SPF
  spf_permerror: number
  spf_temperror: number
  spf_softfail: number

  dkim_all_fail: number // Catch-all for failed DKIM

  // Policy Overrides (denominator: failed events that were overridden)
  dmarc_override_forwarded: number
  dmarc_override_local_policy: number
}

export type DiagnosticRecommendation = {
  type: string
  title: string
  recommendation: string
}

export type DkimRecord = {
  selector: string
  record: string | null
  valid: boolean
}

export type MxRecord = {
  priority: number
  exchange: string
}

export type DnsDiagnostics = {
  domain: string
  txtRecords: string[][]
  spf: string | null
  spfValid: boolean
  spfWarning: string | null
  spfValidationCategories: SpfValidationCategory[]
  dmarc: string | null
  dmarcPolicy: string | null
  dmarcValid: boolean
  dmarcWarnings: string[]
  dmarcTags: DmarcTagInfo[]
  dkim: DkimRecord[]
  dkimParsedRecords: DkimParsedRecord[]
  mx: MxRecord[]
  bimi: BimiResult
  mtaSts: MtaStsResult
  tlsRpt: TlsRptResult
  aRecords: string[]
  nsRecords: string[]
}

export type * from './SpfCheckResult'
export type * from './SpfValidationCategory'
