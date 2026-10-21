import type { Resolver } from 'node:dns/promises'
import { describe, expect, it, vi } from 'vitest'
import { getEffectivePublicDmarcRecord } from '../src/services/public-check/getEffectivePublicDmarcRecord'
import { getPublicDmarcWalkNames } from '../src/services/public-check/getPublicDmarcWalkNames'
import { resolvePublicDmarcCheck } from '../src/services/public-check/resolvePublicDmarcCheck'
import { resolvePublicSpfCheck } from '../src/services/public-check/resolvePublicSpfCheck'
import { normalizePublicDkimLabel } from '../src/validators/public-check/normalizePublicDkimLabel'

describe('bounded public DNS evidence', () => {
  const authorDomain = 'example.com'
  it('follows SPF include and redirect and reports missing dependencies', async () => {
    const resolveTxt = vi
      .fn()
      .mockResolvedValueOnce([['v=spf1 redirect=_spf.provider.com']])
      .mockResolvedValueOnce([])
    const result = await resolvePublicSpfCheck(
      { resolveTxt } as unknown as Resolver,
      authorDomain,
      [['v=spf1 include:provider.com ~all']],
    )
    expect(result.status).toBe('attention')
    expect(resolveTxt.mock.calls.map(([name]) => String(name))).toEqual([
      'provider.com',
      '_spf.provider.com',
    ])
  })
  it('does not follow ignored redirects or mechanisms after all', async () => {
    const resolveTxt = vi.fn()
    const result = await resolvePublicSpfCheck(
      { resolveTxt } as unknown as Resolver,
      authorDomain,
      [['v=spf1 ~all redirect=missing.com include:missing.com']],
    )
    expect(result.points).toBe(50)
    expect(resolveTxt).not.toHaveBeenCalled()
  })
  it('recognizes cycles without unbounded DNS requests', async () => {
    const resolveTxt = vi
      .fn()
      .mockResolvedValue([['v=spf1 include:example.com -all']])
    const result = await resolvePublicSpfCheck(
      { resolveTxt } as unknown as Resolver,
      authorDomain,
      [['v=spf1 include:example.com -all']],
    )
    expect(result.status).toBe('attention')
    expect(result.recommendation).toContain('cycle')
    expect(resolveTxt).toHaveBeenCalledTimes(1)
  })
  it('keeps DNS timeouts and sender-specific macros unverified', async () => {
    const resolveTxt = vi.fn().mockRejectedValue({ code: 'ETIMEOUT' })
    expect(
      (
        await resolvePublicSpfCheck(
          { resolveTxt } as unknown as Resolver,
          authorDomain,
          [['v=spf1 include:provider.com -all']],
        )
      ).points,
    ).toBeNull()
    expect(
      (
        await resolvePublicSpfCheck(
          { resolveTxt } as unknown as Resolver,
          authorDomain,
          [['v=spf1 include:%{i}.provider.com -all']],
        )
      ).points,
    ).toBeNull()
  })
  it('rejects private dependency targets without resolving them', async () => {
    const resolveTxt = vi.fn()
    expect(
      (
        await resolvePublicSpfCheck(
          { resolveTxt } as unknown as Resolver,
          authorDomain,
          [['v=spf1 include:server.internal -all']],
        )
      ).points,
    ).toBe(0)
    expect(resolveTxt).not.toHaveBeenCalled()
  })
  it('counts repeated SPF dependencies for each evaluation path', async () => {
    const resolveTxt = vi.fn().mockResolvedValue([['v=spf1 a mx -all']])
    const result = await resolvePublicSpfCheck(
      { resolveTxt } as unknown as Resolver,
      authorDomain,
      [
        [
          `v=spf1 ${Array.from({ length: 4 }, () => 'include:provider.com').join(' ')} -all`,
        ],
      ],
    )
    expect(result.status).toBe('attention')
    expect(result.recommendation).toContain('more than ten')
  })
  it('uses the organizational policy and sp, rather than the nearest unmarked ancestor', async () => {
    const resolveTxt = vi
      .fn()
      .mockImplementation((name: string) =>
        name === '_dmarc.team.example.com'
          ? [['v=DMARC1; p=none']]
          : name === '_dmarc.example.com'
            ? [['v=DMARC1; p=reject; sp=quarantine; psd=n']]
            : [],
      )
    const result = await resolvePublicDmarcCheck(
      { resolveTxt } as unknown as Resolver,
      'mail.team.example.com',
    )
    expect(result.summary).toContain('Inherited DMARC from example.com')
    expect(result.summary).toContain('p=quarantine')
    expect(result.points).toBe(40)
    expect(resolveTxt).toHaveBeenCalledTimes(3)
  })
  it('preserves a direct policy and bounds deep walks to eight queries', async () => {
    const resolveTxt = vi.fn().mockResolvedValue([['v=DMARC1; p=none']])
    expect(
      (
        await resolvePublicDmarcCheck(
          { resolveTxt } as unknown as Resolver,
          'mail.example.com',
        )
      ).points,
    ).toBe(30)
    expect(resolveTxt).toHaveBeenCalledTimes(1)
    expect(getPublicDmarcWalkNames('a.b.c.d.e.f.g.h.example.com')).toHaveLength(
      8,
    )
    expect(getPublicDmarcWalkNames('a.b.c.d.e.f.g.h.example.com')[1]).toBe(
      'd.e.f.g.h.example.com',
    )
  })
  it('does not promote a partial ancestor result after a transient DNS failure', async () => {
    const resolveTxt = vi
      .fn()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([['v=DMARC1; p=reject']])
      .mockRejectedValueOnce({ code: 'ESERVFAIL' })
    expect(
      (
        await resolvePublicDmarcCheck(
          { resolveTxt } as unknown as Resolver,
          'a.example.com',
        )
      ).status,
    ).toBe('unknown')
  })
  it('does not score np without domain-existence evidence', async () => {
    const resolveTxt = vi
      .fn()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([['v=DMARC1; p=reject; np=none; psd=n']])
    expect(
      (
        await resolvePublicDmarcCheck(
          { resolveTxt } as unknown as Resolver,
          'mail.example.com',
        )
      ).points,
    ).toBeNull()
  })
  it('lowers test-mode DMARC enforcement without changing the raw record', () => {
    expect(getEffectivePublicDmarcRecord('v=DMARC1; p=reject; t=y')).toContain(
      'p=quarantine',
    )
    expect(
      getEffectivePublicDmarcRecord('v=DMARC1; p=quarantine; t=y'),
    ).toContain('p=none')
  })
  it.each(['google', 'selector1', 's2026.provider'])(
    'accepts selector %s',
    (value) => {
      expect(normalizePublicDkimLabel(value)).toBe(value)
    },
  )
  it.each(['../private', '_domainkey', 'a'.repeat(64), 'a@b', 's..x'])(
    'rejects selector %s',
    (value) => {
      expect(normalizePublicDkimLabel(value)).toBeNull()
    },
  )
})
