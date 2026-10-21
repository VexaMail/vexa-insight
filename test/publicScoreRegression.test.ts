import { describe, expect, it } from 'vitest'
import { buildPublicConfigurationScore } from '../src/services/public-check/buildPublicConfigurationScore'
import { buildPublicDmarcCheck } from '../src/services/public-check/buildPublicDmarcCheck'
import { buildPublicSpfCheck } from '../src/services/public-check/buildPublicSpfCheck'

describe('public DNS scoring and false-positive regressions', () => {
  it('scores the teleporte.es policies without treating SoftFail or monitoring as broken', () => {
    const spf = buildPublicSpfCheck([
      [
        'v=spf1 +a:mail.teleporte.es +mx +ip4:46.4.179.175 +ip6:2a01:4f8:2210:1792::2 include:spf.protection.outlook.com ~all',
      ],
    ])
    const dmarc = buildPublicDmarcCheck([
      ['v=DMARC1; p=none; rua=mailto:reports@example.com; fo=1'],
    ])
    expect(spf.status).toBe('pass')
    expect(spf.recommendation).toContain('not a configuration error')
    expect(dmarc.status).toBe('info')
    expect(buildPublicConfigurationScore([spf, dmarc])).toEqual({
      value: 80,
      spf: 50,
      dmarc: 30,
    })
  })
  it.each([
    'v=spf1 a mx ~all',
    'v=spf1 redirect=_spf.example.com',
    'v=spf1 a mx',
    'v=spf1 ptr -all',
    'v=spf1 ip4:192.0.2.0/16 -all',
    'v=spf1 -all',
  ])('accepts valid policy %s without heuristic errors', (record) => {
    expect(buildPublicSpfCheck([[record]]).status).toBe('pass')
  })
  it.each([
    'v=spf1 +ALL',
    'v=spf1 all',
    'v=spf1 banana -all',
    'v=spf1 ip4:999.1.1.1 -all',
    'v=spf1 ip4:192.0.2.1/33 -all',
    'v=spf1 mx/33 -all',
    'v=spf1 redirect=a.com redirect=b.com',
  ])('does not award SPF points to %s', (record) => {
    expect(buildPublicSpfCheck([[record]]).points).toBe(0)
  })
  it('ignores unreachable DNS mechanisms after all', () => {
    const includes = Array.from(
      { length: 11 },
      (_, index) => `include:spf${String(index)}.example.com`,
    ).join(' ')
    expect(buildPublicSpfCheck([[`v=spf1 -all ${includes}`]]).points).toBe(50)
    expect(buildPublicSpfCheck([[`v=spf1 ${includes} -all`]]).points).toBe(0)
    const tenIncludes = includes.split(' ').slice(0, 10).join(' ')
    expect(
      buildPublicSpfCheck([
        [`v=spf1 ${tenIncludes} redirect=ignored.example.com -all`],
      ]).points,
    ).toBe(50)
  })
  it('reads p separately from sp and ignores unknown DMARC extensions', () => {
    expect(
      buildPublicDmarcCheck([['v=DMARC1; sp=reject; p=none']]).points,
    ).toBe(30)
    expect(
      buildPublicDmarcCheck([['v=DMARC1; p=reject; x-extension=hello']]).points,
    ).toBe(50)
  })
  it('accounts for partial DMARC enforcement', () => {
    expect(buildPublicDmarcCheck([['v=DMARC1; p=reject; pct=10']]).points).toBe(
      32,
    )
    expect(
      buildPublicDmarcCheck([['v=DMARC1; p=quarantine; pct=50']]).points,
    ).toBe(35)
    expect(buildPublicDmarcCheck([['v=DMARC1; p=reject; pct=0']]).status).toBe(
      'info',
    )
    expect(
      buildPublicDmarcCheck([['v=DMARC1; p=reject; pct=101']]).points,
    ).toBe(0)
  })
  it('does not invent a score for DNS failures or unchecked inheritance', () => {
    const spf = buildPublicSpfCheck([['v=spf1 -all']])
    expect(
      buildPublicConfigurationScore([spf, buildPublicDmarcCheck(null)]).value,
    ).toBeNull()
    expect(
      buildPublicConfigurationScore([spf, buildPublicDmarcCheck([])]).value,
    ).toBeNull()
    expect(
      buildPublicConfigurationScore([
        buildPublicSpfCheck(null),
        buildPublicDmarcCheck([['v=DMARC1; p=reject']]),
      ]).value,
    ).toBeNull()
  })
})
