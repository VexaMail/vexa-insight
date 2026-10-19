import type { ReportOutcomeLabel } from '@/types/reports'

/**
 * Pass when every message passes the check, fail when none does, partial in
 * between; nothing when the report has no messages to judge.
 */
export function rateVerdict(
  rate: number,
  total: number,
): ReportOutcomeLabel | undefined {
  if (total === 0) return undefined
  if (rate >= 100) return { tone: 'success', label: 'Pass' }
  if (rate <= 0) return { tone: 'danger', label: 'Fail' }
  return { tone: 'warning', label: 'Partial' }
}
