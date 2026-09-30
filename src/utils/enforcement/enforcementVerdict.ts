import { ENFORCEMENT_THRESHOLDS } from '@/constants/enforcement'
import type { EnforcementVerdict } from '@/types/enforcement'

/** The readiness verdict from volume, coverage and legitimate failures. */
export function enforcementVerdict(input: {
  totalMessages: number
  reportDays: number
  legitimateFailureRate: number
}): EnforcementVerdict {
  if (
    input.totalMessages < ENFORCEMENT_THRESHOLDS.minMessages ||
    input.reportDays < ENFORCEMENT_THRESHOLDS.minReportDays
  ) {
    return 'insufficient-data'
  }
  return input.legitimateFailureRate >
    ENFORCEMENT_THRESHOLDS.maxLegitimateFailureRate
    ? 'fix-first'
    : 'ready'
}
