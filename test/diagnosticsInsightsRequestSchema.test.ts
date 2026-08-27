import { describe, expect, it } from 'vitest'
import { diagnosticsInsightsRequestSchema } from '../src/validators/ai'

describe('diagnosticsInsightsRequestSchema', () => {
  const base = () => ({ domainName: 'example.com', domainId: 3 })

  it('accepts a domain without a date range', () => {
    const parsed = diagnosticsInsightsRequestSchema.safeParse(base())
    expect(parsed.success).toBe(true)
    expect(parsed.data).toMatchObject({
      domainName: 'example.com',
      domainId: 3,
    })
  })

  it('accepts an optional date range', () => {
    const parsed = diagnosticsInsightsRequestSchema.safeParse({
      ...base(),
      startDate: '2026-01-01',
      endDate: '2026-02-01',
    })
    expect(parsed.data).toMatchObject({
      startDate: '2026-01-01',
      endDate: '2026-02-01',
    })
  })

  it('accepts null dates', () => {
    expect(
      diagnosticsInsightsRequestSchema.safeParse({
        ...base(),
        startDate: null,
        endDate: null,
      }).success,
    ).toBe(true)
  })

  it('rejects a missing, empty or non-string domainName', () => {
    for (const domainName of [undefined, '', 5, null]) {
      expect(
        diagnosticsInsightsRequestSchema.safeParse({ ...base(), domainName })
          .success,
      ).toBe(false)
    }
  })

  it('rejects a missing, zero or non-numeric domainId', () => {
    for (const domainId of [undefined, 0, -1, '3']) {
      expect(
        diagnosticsInsightsRequestSchema.safeParse({ ...base(), domainId })
          .success,
      ).toBe(false)
    }
  })

  it('rejects non-string dates and non-object bodies', () => {
    expect(
      diagnosticsInsightsRequestSchema.safeParse({ ...base(), startDate: 123 })
        .success,
    ).toBe(false)
    expect(diagnosticsInsightsRequestSchema.safeParse(null).success).toBe(false)
    expect(diagnosticsInsightsRequestSchema.safeParse([]).success).toBe(false)
  })
})
