import type { SpfCheckResult, SpfValidationCategory } from '@/types/diagnostics'
import { describe, expect, it } from 'vitest'
import { analyzeSpfRecord } from '../services/diagnostics/analyzeSpfRecord'

describe('analyzeSpfRecord', () => {
  function findCheck(
    categories: SpfValidationCategory[],
    category: string,
    name: string,
  ): SpfCheckResult | undefined {
    return categories
      .find((c) => c.category === category)
      ?.checks.find((check) => check.name === name)
  }

  it('returns a single failed Record Status category when no SPF exists', () => {
    const result = analyzeSpfRecord(null, [])

    expect(result).toHaveLength(1)
    expect(result[0]?.category).toBe('Record Status')
    expect(result[0]?.checks).toHaveLength(1)
    expect(result[0]?.checks[0]?.passed).toBe(false)
  })

  it('returns the five analysis categories in order for a valid record', () => {
    const spf = 'v=spf1 include:_spf.google.com ~all'
    const result = analyzeSpfRecord(spf, [spf])

    expect(result.map((c) => c.category)).toEqual([
      'Syntax & Formatting',
      'Configuration',
      'Resource Limitations',
      'Authorization & Scope',
      'Third-Party Dependencies',
    ])
  })

  it('passes syntax checks for a typical Google Workspace record', () => {
    const spf = 'v=spf1 include:_spf.google.com ~all'
    const result = analyzeSpfRecord(spf, [spf])

    expect(
      findCheck(result, 'Syntax & Formatting', 'Valid SPF record')?.passed,
    ).toBe(true)
    expect(
      findCheck(result, 'Syntax & Formatting', 'Single SPF record')?.passed,
    ).toBe(true)
    expect(
      findCheck(result, 'Syntax & Formatting', 'Contains "all" mechanism')
        ?.passed,
    ).toBe(true)
  })

  it('fails the valid-record check when the record does not start with v=spf1', () => {
    const spf = 'spf2.0/pra include:example.com -all'
    const result = analyzeSpfRecord(spf, [spf])

    expect(
      findCheck(result, 'Syntax & Formatting', 'Valid SPF record')?.passed,
    ).toBe(false)
  })

  it('fails the single-record check when multiple SPF records exist', () => {
    const spf = 'v=spf1 include:_spf.google.com ~all'
    const other = 'v=spf1 ip4:203.0.113.5 -all'
    const result = analyzeSpfRecord(spf, [spf, other])

    const check = findCheck(result, 'Syntax & Formatting', 'Single SPF record')
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('2 SPF records found')
  })

  it('fails when the record has no all mechanism', () => {
    const spf = 'v=spf1 include:_spf.example.com'
    const result = analyzeSpfRecord(spf, [spf])

    expect(
      findCheck(result, 'Syntax & Formatting', 'Contains "all" mechanism')
        ?.passed,
    ).toBe(false)
  })

  it('passes strict enforcement for -all (Microsoft 365 style record)', () => {
    const spf = 'v=spf1 include:spf.protection.outlook.com -all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Configuration',
      'Strict enforcement (-all)',
    )
    expect(check?.passed).toBe(true)
    expect(check?.detail).toContain('-all')
  })

  it('fails strict enforcement for ~all and ?all', () => {
    const soft = 'v=spf1 include:_spf.google.com ~all'
    const neutral = 'v=spf1 include:_spf.google.com ?all'

    const softCheck = findCheck(
      analyzeSpfRecord(soft, [soft]),
      'Configuration',
      'Strict enforcement (-all)',
    )
    const neutralCheck = findCheck(
      analyzeSpfRecord(neutral, [neutral]),
      'Configuration',
      'Strict enforcement (-all)',
    )

    expect(softCheck?.passed).toBe(false)
    expect(softCheck?.detail).toContain('SoftFail')
    expect(neutralCheck?.passed).toBe(false)
    expect(neutralCheck?.detail).toContain('Neutral')
  })

  it('flags the deprecated ptr mechanism', () => {
    const spf = 'v=spf1 ptr ~all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Configuration',
      'No deprecated PTR mechanism',
    )
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('deprecated')
  })

  it('passes the lookup limit for a small number of mechanisms', () => {
    const spf = 'v=spf1 include:_spf.google.com include:sendgrid.net mx ~all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Resource Limitations',
      'DNS lookup limit (max 10)',
    )
    expect(check?.passed).toBe(true)
    expect(check?.detail).toContain('Estimated 3 DNS lookups')
  })

  it('counts qualified and record-final a/mx mechanisms as lookups', () => {
    const spf = 'v=spf1 -a a/24 include:_spf.google.com mx'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Resource Limitations',
      'DNS lookup limit (max 10)',
    )
    expect(check?.detail).toContain('Estimated 4 DNS lookups')
  })

  it('fails the lookup limit when more than 10 lookups are estimated', () => {
    const includes = Array.from(
      { length: 11 },
      (_, i) => `include:spf${i}.example.com`,
    ).join(' ')
    const spf = `v=spf1 ${includes} -all`
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Resource Limitations',
      'DNS lookup limit (max 10)',
    )
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('Estimated 11 DNS lookups')
    expect(check?.detail).toContain('PermError')
  })

  it('fails the length check for records over 450 characters', () => {
    const spf = `v=spf1 ${'ip4:203.0.113.1 '.repeat(30)}-all`
    const result = analyzeSpfRecord(spf, [spf])

    expect(spf.length).toBeGreaterThan(450)
    expect(
      findCheck(result, 'Resource Limitations', 'Record length')?.passed,
    ).toBe(false)
  })

  it('fails authorization when no senders are defined', () => {
    const spf = 'v=spf1 -all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Authorization & Scope',
      'Authorized senders defined',
    )
    expect(check?.passed).toBe(false)
  })

  it('accepts a /24 range but flags ranges wider than /24', () => {
    const narrow = 'v=spf1 ip4:203.0.113.0/24 -all'
    const broad = 'v=spf1 ip4:10.0.0.0/8 -all'

    const narrowCheck = findCheck(
      analyzeSpfRecord(narrow, [narrow]),
      'Authorization & Scope',
      'No overly broad IP ranges',
    )
    const broadCheck = findCheck(
      analyzeSpfRecord(broad, [broad]),
      'Authorization & Scope',
      'No overly broad IP ranges',
    )

    expect(narrowCheck?.passed).toBe(true)
    expect(broadCheck?.passed).toBe(false)
  })

  it('omits the broad-range check when no CIDR notation is used', () => {
    const spf = 'v=spf1 ip4:203.0.113.5 -all'
    const result = analyzeSpfRecord(spf, [spf])

    expect(
      findCheck(result, 'Authorization & Scope', 'No overly broad IP ranges'),
    ).toBeUndefined()
  })

  it('lists third-party includes in the dependencies category', () => {
    const spf = 'v=spf1 include:_spf.google.com include:sendgrid.net -all'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Third-Party Dependencies',
      'Third-party includes',
    )
    expect(check?.passed).toBe(true)
    expect(check?.detail).toContain('sendgrid.net')
  })

  it('flags redirect usage', () => {
    const spf = 'v=spf1 redirect=_spf.example.com'
    const result = analyzeSpfRecord(spf, [spf])

    const check = findCheck(
      result,
      'Third-Party Dependencies',
      'Redirect usage',
    )
    expect(check?.passed).toBe(false)
    expect(check?.detail).toContain('redirect=')
  })
})
