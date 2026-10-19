import { tldCountryCode, toDailySeries } from '@/utils/domains'
import { describe, expect, it } from 'vitest'

describe('tldCountryCode', () => {
  it('reads the country of a country-code TLD', () => {
    expect(tldCountryCode('example.es')).toBe('ES')
    expect(tldCountryCode('mail.example.co.uk')).toBe('GB')
  })

  it('has no country for generic TLDs or ccTLDs sold as generic', () => {
    expect(tldCountryCode('example.com')).toBeNull()
    expect(tldCountryCode('example.io')).toBeNull()
    expect(tldCountryCode('example')).toBeNull()
  })
})

describe('toDailySeries', () => {
  it('fills missing days with zero and drops days outside the window', () => {
    const rows = [
      { day: 99, total: 5 },
      { day: 100, total: 3 },
      { day: 102, total: 7 },
    ]
    expect(toDailySeries(rows, 100, 4)).toEqual([3, 0, 7, 0])
  })
})
