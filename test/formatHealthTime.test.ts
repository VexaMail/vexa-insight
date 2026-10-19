import { formatHealthTime } from '@/utils/ingest'
import { describe, expect, it } from 'vitest'

describe('formatHealthTime', () => {
  it('prints the minute in UTC', () => {
    expect(formatHealthTime(new Date('2026-10-19T01:00:30Z'))).toBe(
      '2026-10-19 01:00 UTC',
    )
  })

  it('returns undefined without a date', () => {
    expect(formatHealthTime(null)).toBeUndefined()
  })
})
