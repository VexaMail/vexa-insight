import { describe, expect, it } from 'vitest'
import { analyzeSpfRecord } from '../src/services/diagnostics/analyzeSpfRecord'
import { findSpfCheck } from './setup/findSpfCheck'
import { SPF_CATEGORY } from './setup/spfCategoryNames'

const ALL_MECHANISM_CHECK = 'Contains "all" mechanism'
const SINGLE_RECORD_CHECK = 'Single SPF record'
const VALID_RECORD_CHECK = 'Valid SPF record'
const GOOGLE_SPF = 'v=spf1 include:_spf.google.com ~all'

describe('analyzeSpfRecord: syntax and record status', () => {
  it('returns a single failed Record Status category when no SPF exists', () => {
    const result = analyzeSpfRecord(null, [])

    expect(result).toHaveLength(1)
    expect(result[0]?.category).toBe('Record Status')
    expect(result[0]?.checks).toHaveLength(1)
    expect(result[0]?.checks[0]?.passed).toBe(false)
  })

  it('returns the five analysis categories in order for a valid record', () => {
    const result = analyzeSpfRecord(GOOGLE_SPF, [GOOGLE_SPF])

    expect(result.map((c) => c.category)).toEqual([
      SPF_CATEGORY.syntax,
      SPF_CATEGORY.configuration,
      SPF_CATEGORY.limits,
      SPF_CATEGORY.scope,
      SPF_CATEGORY.dependencies,
    ])
  })

  it('passes syntax checks for a typical Google Workspace record', () => {
    const result = analyzeSpfRecord(GOOGLE_SPF, [GOOGLE_SPF])

    expect(
      findSpfCheck(result, SPF_CATEGORY.syntax, VALID_RECORD_CHECK)?.passed,
    ).toBe(true)
    expect(
      findSpfCheck(result, SPF_CATEGORY.syntax, SINGLE_RECORD_CHECK)?.passed,
    ).toBe(true)
    expect(
      findSpfCheck(result, SPF_CATEGORY.syntax, ALL_MECHANISM_CHECK)?.passed,
    ).toBe(true)
  })

  it('fails the valid-record check when the record does not start with v=spf1', () => {
    const spf = 'spf2.0/pra include:example.com -all'
    const result = analyzeSpfRecord(spf, [spf])

    expect(
      findSpfCheck(result, SPF_CATEGORY.syntax, VALID_RECORD_CHECK)?.passed,
    ).toBe(false)
  })

  it('fails the single-record check when multiple SPF records exist', () => {
    const other = 'v=spf1 ip4:203.0.113.5 -all'
    const result = analyzeSpfRecord(GOOGLE_SPF, [GOOGLE_SPF, other])

    const check = findSpfCheck(result, SPF_CATEGORY.syntax, SINGLE_RECORD_CHECK)
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('2 SPF records found')
  })

  it('fails when the record has no all mechanism', () => {
    const spf = 'v=spf1 include:_spf.example.com'
    const result = analyzeSpfRecord(spf, [spf])

    expect(
      findSpfCheck(result, SPF_CATEGORY.syntax, ALL_MECHANISM_CHECK)?.passed,
    ).toBe(false)
  })
})
