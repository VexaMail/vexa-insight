import { formatUtcTime } from '@/utils/format'
import { describe, expect, it } from 'vitest'

describe('formatUtcTime', () => {
  it('prints the UTC date and minute', () => {
    expect(formatUtcTime(new Date('2026-10-19T08:12:45Z'))).toBe(
      'Oct 19, 2026 08:12 UTC',
    )
  })

  it('keeps the UTC day just before midnight', () => {
    expect(formatUtcTime(new Date('2026-10-19T23:59:00Z'))).toBe(
      'Oct 19, 2026 23:59 UTC',
    )
  })

  it('says never without a date', () => {
    expect(formatUtcTime(null)).toBe('Never')
  })
})
