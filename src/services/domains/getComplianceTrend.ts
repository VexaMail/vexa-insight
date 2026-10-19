import { getDomainSummary } from '@/services/reports'
import type { ComplianceTrend } from '@/types/domains'
import { toComplianceWindow } from '@/utils/domains'

/** Pass rate over the last `days` of reports and over the `days` before. */
export async function getComplianceTrend(
  domainId: number,
  days: number,
  now = new Date(),
): Promise<ComplianceTrend> {
  const dayMs = 86_400_000
  const start = new Date(now.getTime() - (days - 1) * dayMs)
  const previousStart = new Date(start.getTime() - days * dayMs)
  const previousEnd = new Date(start.getTime() - dayMs)
  const [current, previous] = await Promise.all([
    getDomainSummary(domainId, start, now),
    getDomainSummary(domainId, previousStart, previousEnd),
  ])
  return {
    days,
    current: toComplianceWindow(current),
    previous: toComplianceWindow(previous),
  }
}
