import { describe, expect, it } from 'vitest'
import { reportInsightsRequestSchema } from '../validators/ai'

describe('reportInsightsRequestSchema', () => {
  it('accepts a positive reportId', () => {
    expect(
      reportInsightsRequestSchema.safeParse({ reportId: 12 }).data,
    ).toEqual({ reportId: 12 })
  })

  it('rejects a missing, zero, negative or non-numeric reportId', () => {
    for (const body of [
      {},
      { reportId: 0 },
      { reportId: -3 },
      { reportId: '4' },
      { reportId: null },
    ]) {
      const parsed = reportInsightsRequestSchema.safeParse(body)
      expect(parsed.success).toBe(false)
      expect(parsed.error?.issues[0]?.message).toBe(
        'Valid reportId is required.',
      )
    }
  })

  it('rejects non-object bodies with the same message', () => {
    for (const body of [null, 'x', 7, []]) {
      const parsed = reportInsightsRequestSchema.safeParse(body)
      expect(parsed.success).toBe(false)
      expect(parsed.error?.issues[0]?.message).toBe(
        'Valid reportId is required.',
      )
    }
  })
})
