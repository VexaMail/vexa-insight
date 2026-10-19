import type { ComplianceWindow } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

/** A domain summary as a pass-rate window; no summary reads as no mail. */
export function toComplianceWindow(
  summary: DomainSummary | null,
): ComplianceWindow {
  const total = summary?.totalMessages ?? 0
  const passed = summary?.passedCount ?? 0
  return { total, passed, rate: total > 0 ? (passed / total) * 100 : null }
}
