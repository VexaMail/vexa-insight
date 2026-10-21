import { describe, expect, it } from 'vitest'
import { buildPublicDmarcCheck } from '../src/services/public-check/buildPublicDmarcCheck'
import { buildPublicMxCheck } from '../src/services/public-check/buildPublicMxCheck'
import { buildPublicSpfCheck } from '../src/services/public-check/buildPublicSpfCheck'
import { normalizePublicDomain } from '../src/services/public-check/normalizePublicDomain'
import { publicDnsFailure } from '../src/services/public-check/publicDnsFailure'

describe('public domain check', () => {
  it.each([
    'localhost',
    'test.local',
    'test.internal',
    '127.0.0.1',
    'https://example.com',
    'user@example.com',
    'test._tcp.com',
    '-test.com',
    '',
    'a'.repeat(254),
  ])('rejects unsafe domain input %s', (value) => {
    expect(normalizePublicDomain(value)).toBeNull()
  })
  it('normalizes casing, a final dot and international domains', () => {
    expect(normalizePublicDomain(' EXAMPLE.COM. ')).toBe('example.com')
    expect(normalizePublicDomain('bücher.de')).toBe('xn--bcher-kva.de')
  })
  it('distinguishes absent DNS from temporary failures', () => {
    expect(publicDnsFailure({ code: 'ENOTFOUND' })).toEqual([])
    expect(publicDnsFailure({ code: 'ENODATA' })).toEqual([])
    expect(publicDnsFailure({ code: 'ETIMEOUT' })).toBeNull()
    expect(publicDnsFailure({ code: 'ESERVFAIL' })).toBeNull()
    expect(buildPublicSpfCheck(null).status).toBe('unknown')
    expect(buildPublicDmarcCheck(null).status).toBe('unknown')
    expect(buildPublicMxCheck(null).status).toBe('unknown')
  })
  it('does not call duplicate or permissive SPF records a pass', () => {
    expect(buildPublicSpfCheck([['v=spf1 -all']]).status).toBe('pass')
    expect(buildPublicSpfCheck([['v=spf1 +all']]).status).toBe('attention')
    expect(buildPublicSpfCheck([['v=spf1 -all'], ['v=spf1 -all']]).status).toBe(
      'attention',
    )
  })
  it('distinguishes monitoring from enforcement and rejects multiple DMARC records', () => {
    expect(buildPublicDmarcCheck([['v=DMARC1; p=none']]).status).toBe('info')
    expect(buildPublicDmarcCheck([['v=DMARC1; p=reject']]).status).toBe('pass')
    expect(
      buildPublicDmarcCheck([['v=DMARC1; p=reject'], ['v=DMARC1; p=none']])
        .status,
    ).toBe('attention')
  })
  it('does not present null MX as a receiving mail server', () => {
    expect(buildPublicMxCheck(['0 .']).status).toBe('info')
    expect(buildPublicMxCheck(['10 mail.example.com']).status).toBe('pass')
  })
})
