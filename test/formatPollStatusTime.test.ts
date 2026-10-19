import { formatPollStatusTime } from '@/utils/format'
import { describe, expect, it } from 'vitest'

describe('formatPollStatusTime', () => {
  it('prints a fixed UTC timestamp', () => {
    expect(formatPollStatusTime('2026-10-19T03:00:05.123Z')).toBe(
      'Oct 19, 2026 03:00 UTC',
    )
  })

  it('converts an offset timestamp to UTC', () => {
    expect(formatPollStatusTime('2026-10-19T05:00:05+02:00')).toBe(
      'Oct 19, 2026 03:00 UTC',
    )
  })

  it('shows an unparseable value as given', () => {
    expect(formatPollStatusTime('not a date')).toBe('not a date')
  })
})
