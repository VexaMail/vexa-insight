import type { SpfSummary } from '@/types/diagnostics'
import { analyzeSpfRecord } from './analyzeSpfRecord'
import { extractSpfWarning } from './extractSpfWarning'

/** Picks and validates the SPF record among the apex TXT records. */
export function deriveSpfSummary(txtRecords: string[][]): SpfSummary {
  const allTxt = txtRecords.map((r) => r.join(''))
  const allSpfRecords = allTxt.filter((r) => r.startsWith('v=spf1'))
  const spf = allSpfRecords[0] ?? null
  return {
    spf,
    spfValid: allSpfRecords.length === 1,
    spfWarning: spf ? extractSpfWarning(spf, allSpfRecords) : null,
    spfValidationCategories: analyzeSpfRecord(spf, allSpfRecords),
  }
}
