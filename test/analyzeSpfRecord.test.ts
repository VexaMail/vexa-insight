import { describe, expect, it } from 'vitest'
import { analyzeSpfRecord } from '../src/services/diagnostics/analyzeSpfRecord'
import { findSpfCheck } from './setup/findSpfCheck'
import { SPF_CATEGORY } from './setup/spfCategoryNames'

const BROAD_RANGE_CHECK = 'No overly broad IP ranges'

describe('analyzeSpfRecord: authorized senders and dependencies', () => {
  it('fails authorization when no senders are defined', () => {
    const spf = 'v=spf1 -all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(
      result,
      SPF_CATEGORY.scope,
      'Authorized senders defined',
    )
    expect(check?.passed).toBe(false)
  })

  it('accepts a /24 range but flags ranges wider than /24', () => {
    const narrow = 'v=spf1 ip4:203.0.113.0/24 -all'
    const broad = 'v=spf1 ip4:10.0.0.0/8 -all'

    const narrowCheck = findSpfCheck(
      analyzeSpfRecord(narrow, [narrow]),
      SPF_CATEGORY.scope,
      BROAD_RANGE_CHECK,
    )
    const broadCheck = findSpfCheck(
      analyzeSpfRecord(broad, [broad]),
      SPF_CATEGORY.scope,
      BROAD_RANGE_CHECK,
    )

    expect(narrowCheck?.passed).toBe(true)
    expect(broadCheck?.passed).toBe(false)
  })

  it('omits the broad-range check when no CIDR notation is used', () => {
    const spf = 'v=spf1 ip4:203.0.113.5 -all'
    const result = analyzeSpfRecord(spf, [spf])

    expect(
      findSpfCheck(result, SPF_CATEGORY.scope, BROAD_RANGE_CHECK),
    ).toBeUndefined()
  })

  it('lists third-party includes in the dependencies category', () => {
    const spf = 'v=spf1 include:_spf.google.com include:sendgrid.net -all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(
      result,
      SPF_CATEGORY.dependencies,
      'Third-party includes',
    )
    expect(check?.passed).toBe(true)
    expect(check?.detail).toContain('sendgrid.net')
  })

  it('flags redirect usage', () => {
    const spf = 'v=spf1 redirect=_spf.example.com'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(
      result,
      SPF_CATEGORY.dependencies,
      'Redirect usage',
    )
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('redirect=')
  })
})
