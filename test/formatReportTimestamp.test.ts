import { formatReportTimestamp } from '@/utils/format'
import { describe, expect, it } from 'vitest'

describe('formatReportTimestamp', () => {
  it('prints a report boundary in UTC', () => {
    expect(
      formatReportTimestamp(Date.parse('2026-10-16T00:00:00Z') / 1000),
    ).toBe('Oct 16, 2026 00:00 UTC')
  })

  it('keeps the UTC day late in the evening', () => {
    expect(
      formatReportTimestamp(Date.parse('2026-10-16T23:59:59Z') / 1000),
    ).toBe('Oct 16, 2026 23:59 UTC')
  })
})
