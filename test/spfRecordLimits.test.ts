import { describe, expect, it } from 'vitest'
import { analyzeSpfRecord } from '../src/services/diagnostics/analyzeSpfRecord'
import { findSpfCheck } from './setup/findSpfCheck'
import { SPF_CATEGORY } from './setup/spfCategoryNames'

const LOOKUP_CHECK = 'DNS lookup limit (max 10)'

describe('analyzeSpfRecord: resource limits', () => {
  it('passes the lookup limit for a small number of mechanisms', () => {
    const spf = 'v=spf1 include:_spf.google.com include:sendgrid.net mx ~all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(result, SPF_CATEGORY.limits, LOOKUP_CHECK)
    expect(check?.passed).toBe(true)
    expect(check?.detail).toContain('Estimated 3 DNS lookups')
  })

  it('counts qualified and record-final a/mx mechanisms as lookups', () => {
    const spf = 'v=spf1 -a a/24 include:_spf.google.com mx'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(result, SPF_CATEGORY.limits, LOOKUP_CHECK)
    expect(check?.detail).toContain('Estimated 4 DNS lookups')
  })

  it('fails the lookup limit when more than 10 lookups are estimated', () => {
    const includes = Array.from(
      { length: 11 },
      (_, i) => `include:spf${String(i)}.example.com`,
    ).join(' ')
    const spf = `v=spf1 ${includes} -all`
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(result, SPF_CATEGORY.limits, LOOKUP_CHECK)
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('Estimated 11 DNS lookups')
    expect(check?.detail).toContain('PermError')
  })

  it('fails the length check for records over 450 characters', () => {
    const spf = `v=spf1 ${'ip4:203.0.113.1 '.repeat(30)}-all`
    const result = analyzeSpfRecord(spf, [spf])

    expect(spf.length).toBeGreaterThan(450)
    expect(
      findSpfCheck(result, SPF_CATEGORY.limits, 'Record length')?.passed,
    ).toBe(false)
  })
})
