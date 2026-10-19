import type { IpDkimSignature, IpSummaryData } from '@/types/ips'
import {
  buildIpAuthChecks,
  classifySourceCause,
  computeRate,
} from '@/utils/ips'
import { describe, expect, it } from 'vitest'

function source(counts: {
  total: number
  spfAligned: number
  dkimAligned: number
  spfAuth: number
  dmarc: number
  dkimUnaligned?: number
}): IpSummaryData {
  const rate = (n: number) => computeRate(n, counts.total)
  return {
    ip: '192.0.2.10',
    countryCode: null,
    hostname: 'mail.example.com',
    hostnameLastLookupAt: null,
    totalMessages: counts.total,
    emailsSentCount: 0,
    firstSeen: null,
    lastSeen: null,
    spfPassCount: counts.spfAligned,
    dkimPassCount: counts.dkimAligned,
    spfAuthPassCount: counts.spfAuth,
    spfUnalignedPassCount: Math.max(0, counts.spfAuth - counts.spfAligned),
    dkimAuthPassCount: counts.dkimAligned + (counts.dkimUnaligned ?? 0),
    dkimUnalignedPassCount: counts.dkimUnaligned ?? 0,
    dmarcPassCount: counts.dmarc,
    spfAuthPassRate: rate(counts.spfAuth),
    dkimAuthPassRate: rate(counts.dkimAligned + (counts.dkimUnaligned ?? 0)),
    dmarcPassRate: rate(counts.dmarc),
    fullyAlignedCount: Math.min(counts.spfAligned, counts.dkimAligned),
    spfPassRate: rate(counts.spfAligned),
    dkimPassRate: rate(counts.dkimAligned),
    fullyAlignedRate: rate(Math.min(counts.spfAligned, counts.dkimAligned)),
    dispositionNone: counts.total,
    dispositionQuarantine: 0,
    dispositionReject: 0,
  }
}

describe('classifySourceCause', () => {
  it('reads a DKIM-only pass with failing SPF as forwarding', () => {
    const ip = source({
      total: 10,
      spfAligned: 0,
      dkimAligned: 10,
      spfAuth: 0,
      dmarc: 10,
    })
    expect(classifySourceCause(ip)).toBe('forwarding')
  })

  it('reads a DKIM-only pass with SPF for another domain as spf-unaligned', () => {
    const ip = source({
      total: 10,
      spfAligned: 0,
      dkimAligned: 10,
      spfAuth: 10,
      dmarc: 10,
    })
    expect(classifySourceCause(ip)).toBe('spf-unaligned')
  })

  it('passes a source aligned on SPF even when DKIM is not aligned', () => {
    const ip = source({
      total: 10,
      spfAligned: 10,
      dkimAligned: 0,
      spfAuth: 10,
      dmarc: 10,
    })
    expect(classifySourceCause(ip)).toBe('dmarc-pass')
  })

  it('fails a source with neither identifier aligned', () => {
    const ip = source({
      total: 10,
      spfAligned: 0,
      dkimAligned: 0,
      spfAuth: 10,
      dmarc: 0,
    })
    expect(classifySourceCause(ip)).toBe('failing')
  })

  it('leaves mixed results and empty windows unknown', () => {
    expect(
      classifySourceCause(
        source({
          total: 10,
          spfAligned: 5,
          dkimAligned: 5,
          spfAuth: 5,
          dmarc: 5,
        }),
      ),
    ).toBe('unknown')
    expect(
      classifySourceCause(
        source({
          total: 0,
          spfAligned: 0,
          dkimAligned: 0,
          spfAuth: 0,
          dmarc: 0,
        }),
      ),
    ).toBe('unknown')
  })
})

describe('buildIpAuthChecks', () => {
  const foreign: IpDkimSignature = {
    domain: 'esp.example.net',
    selector: 's1',
    result: 'pass',
    isAligned: false,
    messages: 4,
  }

  it('keeps the five facts apart', () => {
    const ip = source({
      total: 4,
      spfAligned: 0,
      dkimAligned: 0,
      spfAuth: 4,
      dmarc: 0,
      dkimUnaligned: 4,
    })
    const keys = buildIpAuthChecks(ip, [foreign]).map((check) => check.key)
    expect(keys).toEqual([
      'spf-auth',
      'spf-aligned',
      'dkim-auth',
      'dkim-aligned',
      'dmarc',
    ])
  })

  it('says a valid signature is from another domain only when one is stored', () => {
    const ip = source({
      total: 4,
      spfAligned: 0,
      dkimAligned: 0,
      spfAuth: 4,
      dmarc: 0,
      dkimUnaligned: 4,
    })
    const withSig = buildIpAuthChecks(ip, [foreign])[3]
    const without = buildIpAuthChecks(ip, [])[3]
    expect(withSig?.detail).toContain(
      'signed by a different domain (d=esp.example.net)',
    )
    expect(without?.detail).not.toContain('different domain')
  })
})
