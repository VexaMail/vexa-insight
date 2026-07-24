import type { BimiResult } from './BimiResult'
import type { DkimParsedRecord } from './DkimParsedRecord'
import type { DkimRecord } from './DkimRecord'
import type { DmarcTagInfo } from './DmarcTagInfo'
import type { MtaStsResult } from './MtaStsResult'
import type { MxRecord } from './MxRecord'
import type { SpfTreeNode } from './SpfTreeNode'
import type { SpfValidationCategory } from './SpfValidationCategory'
import type { TlsRptResult } from './TlsRptResult'

export type DnsDiagnostics = {
  domain: string
  txtRecords: string[][]
  spf: string | null
  spfValid: boolean
  spfWarning: string | null
  spfValidationCategories: SpfValidationCategory[]
  spfTree: SpfTreeNode | null
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
