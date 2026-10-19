import { getFromDateFromDays } from '@/utils/dates'
import { describe, expect, it } from 'vitest'

describe('getFromDateFromDays', () => {
  it('starts "last 30 days" at 00:00 UTC of the 29th day before today', () => {
    const now = new Date('2026-10-19T05:30:00.000Z')
    expect(getFromDateFromDays(now, 30)?.toISOString()).toBe(
      '2026-09-20T00:00:00.000Z',
    )
  })

  it('makes "last 1 day" mean today since midnight UTC', () => {
    const now = new Date('2026-10-19T23:59:00.000Z')
    expect(getFromDateFromDays(now, 1)?.toISOString()).toBe(
      '2026-10-19T00:00:00.000Z',
    )
  })

  it('has no start for out-of-range day counts', () => {
    const now = new Date('2026-10-19T00:00:00.000Z')
    expect(getFromDateFromDays(now, 0)).toBeUndefined()
    expect(getFromDateFromDays(now, 9999)).toBeUndefined()
  })
})
