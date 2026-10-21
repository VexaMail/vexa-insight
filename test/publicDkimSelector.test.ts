import type { Resolver } from 'node:dns/promises'
import { describe, expect, it, vi } from 'vitest'
import { buildPublicDkimCheck } from '../src/services/public-check/buildPublicDkimCheck'

describe('explicit public DKIM lookup', () => {
  const authorDomain = 'example.com'
  it('queries only the explicitly supplied DKIM selector', async () => {
    const resolveTxt = vi.fn().mockResolvedValue([['v=DKIM1; p=candidate']])
    const result = await buildPublicDkimCheck(
      { resolveTxt } as unknown as Resolver,
      authorDomain,
      'provider2026',
    )
    expect(resolveTxt).toHaveBeenCalledExactlyOnceWith(
      'provider2026._domainkey.example.com',
    )
    expect(result.status).toBe('unknown')
    expect(result.summary).toContain('provider2026')
  })
  it('distinguishes a DKIM timeout from a missing selector', async () => {
    const resolveTxt = vi.fn().mockRejectedValue({ code: 'ETIMEOUT' })
    const result = await buildPublicDkimCheck(
      { resolveTxt } as unknown as Resolver,
      authorDomain,
      'provider2026',
    )
    expect(result.dnsUnavailable).toBe(true)
    expect(result.summary).toContain('could not finish')
  })
})
