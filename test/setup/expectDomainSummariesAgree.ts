import type { DomainSummary } from '@/types/reports'
import { expect } from 'vitest'

/**
 * The grouped summary of a domain must match the single-domain query.
 */
export function expectDomainSummariesAgree(
  grouped: DomainSummary | undefined,
  single: DomainSummary | null,
): void {
  expect(grouped).toBeDefined()
  expect(grouped?.totalMessages).toBe(single?.totalMessages)
  expect(grouped?.passedCount).toBe(single?.passedCount)
  expect(grouped?.failedCount).toBe(single?.failedCount)
  expect(grouped?.passRatePercent).toBeCloseTo(single?.passRatePercent ?? 0, 6)
}
