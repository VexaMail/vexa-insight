import { describe, expect, it } from 'vitest'
import { dateRangeQuerySchema } from '../src/validators/query'

describe('dateRangeQuerySchema', () => {
  function parseQuery(query: string) {
    return dateRangeQuerySchema.parse(
      Object.fromEntries(new URLSearchParams(query)),
    )
  }

  function daysBetween(from: Date, to: Date): number {
    return Math.round((to.getTime() - from.getTime()) / 86_400_000)
  }

  it('returns undefined for both bounds when nothing is supplied', () => {
    expect(parseQuery('')).toEqual({ from: undefined, to: undefined })
  })

  it('parses valid ISO from/to values', () => {
    const { from, to } = parseQuery(
      'from=2024-01-01T00:00:00.000Z&to=2024-02-01T00:00:00.000Z',
    )
    expect(from?.toISOString()).toBe('2024-01-01T00:00:00.000Z')
    expect(to?.toISOString()).toBe('2024-02-01T00:00:00.000Z')
  })

  it('drops unparsable dates instead of rejecting the request', () => {
    expect(parseQuery('from=not-a-date&to=also-bad')).toEqual({
      from: undefined,
      to: undefined,
    })
  })

  it('derives from from days when neither bound is supplied', () => {
    const { from, to } = parseQuery('days=7')
    expect(to).toBeUndefined()
    expect(from).toBeInstanceOf(Date)
    expect(daysBetween(from as Date, new Date())).toBe(7)
  })

  it('ignores days when an explicit bound is present', () => {
    expect(
      parseQuery('days=7&from=2024-01-01T00:00:00.000Z').from?.toISOString(),
    ).toBe('2024-01-01T00:00:00.000Z')
    expect(
      parseQuery('days=7&to=2024-01-01T00:00:00.000Z').from,
    ).toBeUndefined()
  })

  it('ignores days when a malformed to bound is present', () => {
    expect(parseQuery('days=7&to=nonsense')).toEqual({
      from: undefined,
      to: undefined,
    })
  })

  it('ignores the custom sentinel and out-of-range day counts', () => {
    expect(parseQuery('days=custom').from).toBeUndefined()
    expect(parseQuery('days=0').from).toBeUndefined()
    expect(parseQuery('days=-5').from).toBeUndefined()
    expect(parseQuery('days=9999').from).toBeUndefined()
    expect(parseQuery('days=abc').from).toBeUndefined()
  })

  it('ignores unrelated query params', () => {
    expect(parseQuery('page=2&org=acme')).toEqual({
      from: undefined,
      to: undefined,
    })
  })
})
