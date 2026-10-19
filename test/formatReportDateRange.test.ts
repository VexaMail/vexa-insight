import { formatReportDateRange } from '@/utils/format'
import { describe, expect, it } from 'vitest'

const at = (iso: string) => Date.parse(iso) / 1000

describe('formatReportDateRange', () => {
  it('prints a two-day window with the year once', () => {
    expect(
      formatReportDateRange(
        at('2026-10-16T00:00:00Z'),
        at('2026-10-17T00:00:00Z'),
      ),
    ).toBe('Oct 16 – Oct 17, 2026')
  })

  it('prints a one-day window once', () => {
    expect(
      formatReportDateRange(
        at('2026-10-16T00:00:00Z'),
        at('2026-10-16T23:59:59Z'),
      ),
    ).toBe('Oct 16, 2026')
  })

  it('keeps both years when the window crosses a new year', () => {
    expect(
      formatReportDateRange(
        at('2025-12-31T00:00:00Z'),
        at('2026-01-01T00:00:00Z'),
      ),
    ).toBe('Dec 31, 2025 – Jan 1, 2026')
  })

  it('uses UTC days, not the local zone', () => {
    // 23:30 UTC is already the next day east of Greenwich.
    expect(
      formatReportDateRange(
        at('2026-10-16T23:30:00Z'),
        at('2026-10-17T23:30:00Z'),
      ),
    ).toBe('Oct 16 – Oct 17, 2026')
  })
})
