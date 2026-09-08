import { describe, expect, it } from 'vitest'
import { analyzeSpfRecord } from '../src/services/diagnostics/analyzeSpfRecord'
import { findSpfCheck } from './setup/findSpfCheck'
import { SPF_CATEGORY } from './setup/spfCategoryNames'

const STRICT_CHECK = 'Strict enforcement (-all)'

describe('analyzeSpfRecord: enforcement and deprecated mechanisms', () => {
  it('passes strict enforcement for -all (Microsoft 365 style record)', () => {
    const spf = 'v=spf1 include:spf.protection.outlook.com -all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(result, SPF_CATEGORY.configuration, STRICT_CHECK)
    expect(check?.passed).toBe(true)
    expect(check?.detail).toContain('-all')
  })

  it('fails strict enforcement for ~all and ?all', () => {
    const soft = 'v=spf1 include:_spf.google.com ~all'
    const neutral = 'v=spf1 include:_spf.google.com ?all'

    const softCheck = findSpfCheck(
      analyzeSpfRecord(soft, [soft]),
      SPF_CATEGORY.configuration,
      STRICT_CHECK,
    )
    const neutralCheck = findSpfCheck(
      analyzeSpfRecord(neutral, [neutral]),
      SPF_CATEGORY.configuration,
      STRICT_CHECK,
    )

    expect(softCheck?.passed).toBe(false)
    expect(softCheck?.detail).toContain('SoftFail')
    expect(neutralCheck?.passed).toBe(false)
    expect(neutralCheck?.detail).toContain('Neutral')
  })

  it('flags the deprecated ptr mechanism', () => {
    const spf = 'v=spf1 ptr ~all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findSpfCheck(
      result,
      SPF_CATEGORY.configuration,
      'No deprecated PTR mechanism',
    )
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('deprecated')
  })
})
