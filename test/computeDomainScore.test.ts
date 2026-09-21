import { describe, expect, it } from 'vitest'
import { computeDomainScore } from '../src/services/diagnostics/computeDomainScore'
import { makeEmptyDnsDiagnostics as makeDns } from './setup/makeEmptyDnsDiagnostics'

describe('computeDomainScore', () => {
  const validSpf = {
    spf: 'v=spf1 include:_spf.google.com -all',
    spfValid: true,
  }

  const validDkim = {
    dkim: [
      { selector: 'google', record: 'v=DKIM1; k=rsa; p=MIIBIjAN', valid: true },
    ],
  }

  const dmarcReject = {
    dmarc: 'v=DMARC1; p=reject; rua=mailto:dmarc@example.com',
    dmarcPolicy: 'reject',
    dmarcValid: true,
  }

  const dmarcQuarantine = {
    dmarc: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com',
    dmarcPolicy: 'quarantine',
    dmarcValid: true,
  }

  const dmarcNone = {
    dmarc: 'v=DMARC1; p=none; rua=mailto:dmarc@example.com',
    dmarcPolicy: 'none',
    dmarcValid: true,
  }

  const validMtaSts = {
    mtaSts: {
      raw: 'v=STSv1; id=20240101T000000',
      valid: true,
      policyFileAccessible: true,
      policyHost: 'mta-sts.example.com',
      mode: 'enforce',
      fileAge: null,
      mxRecords: ['mx.example.com'],
    },
  }

  function earnedFor(
    score: ReturnType<typeof computeDomainScore>,
    id: string,
  ): number {
    return score.checks.find((check) => check.id === id)?.earned ?? -1
  }

  it('scores 0 with grade F when nothing is configured', () => {
    const result = computeDomainScore(makeDns())

    expect(result.percentage).toBe(0)
    expect(result.coreScore).toBe(0)
    expect(result.bonusScore).toBe(0)
    expect(result.grade).toBe('F')
  })

  it('reaches 100 on core alone with SPF, DKIM and p=reject', () => {
    const result = computeDomainScore(
      makeDns({ ...validSpf, ...validDkim, ...dmarcReject }),
    )

    expect(result.coreScore).toBe(100)
    expect(result.percentage).toBe(100)
    expect(result.grade).toBe('A')
  })

  it('caps the total at 100 when hardening bonuses are added', () => {
    const result = computeDomainScore(
      makeDns({
        ...validSpf,
        ...validDkim,
        ...dmarcReject,
        ...validMtaSts,
        tlsRpt: {
          raw: 'v=TLSRPTv1; rua=mailto:tls@example.com',
          valid: true,
          ruaAddresses: ['mailto:tls@example.com'],
        },
        bimi: {
          raw: 'v=BIMI1; l=https://example.com/logo.svg',
          valid: true,
          logoUrl: 'https://example.com/logo.svg',
          certificateUrl: null,
        },
      }),
    )

    expect(result.bonusScore).toBe(10)
    expect(result.percentage).toBe(100)
  })

  it('scores the common SPF + DKIM + p=none domain as 65, grade C', () => {
    const result = computeDomainScore(
      makeDns({ ...validSpf, ...validDkim, ...dmarcNone }),
    )

    expect(result.percentage).toBe(65)
    expect(result.grade).toBe('C')
  })

  it('ranks reject above quarantine above none', () => {
    const reject = computeDomainScore(makeDns(dmarcReject))
    const quarantine = computeDomainScore(makeDns(dmarcQuarantine))
    const none = computeDomainScore(makeDns(dmarcNone))

    expect(earnedFor(reject, 'dmarc')).toBe(50)
    expect(earnedFor(quarantine, 'dmarc')).toBe(35)
    expect(earnedFor(none, 'dmarc')).toBe(15)
  })

  it('docks DMARC points for a partial pct and for a missing rua', () => {
    const partial = computeDomainScore(
      makeDns({
        dmarc: 'v=DMARC1; p=reject; pct=20; rua=mailto:dmarc@example.com',
        dmarcPolicy: 'reject',
        dmarcValid: true,
      }),
    )
    const noRua = computeDomainScore(
      makeDns({
        dmarc: 'v=DMARC1; p=reject',
        dmarcPolicy: 'reject',
        dmarcValid: true,
      }),
    )

    expect(earnedFor(partial, 'dmarc')).toBe(40)
    expect(earnedFor(noRua, 'dmarc')).toBe(45)
  })

  it('gives partial SPF credit when a record exists but is invalid', () => {
    const result = computeDomainScore(
      makeDns({ spf: 'v=spf1 -all v=spf1', spfValid: false }),
    )

    expect(earnedFor(result, 'spf')).toBe(10)
  })

  it('gives partial DMARC credit when a record exists but is invalid', () => {
    const result = computeDomainScore(
      makeDns({ dmarc: 'v=DMARC1', dmarcPolicy: null, dmarcValid: false }),
    )

    expect(earnedFor(result, 'dmarc')).toBe(5)
  })

  it('requires at least one valid DKIM selector for DKIM credit', () => {
    const noneValid = computeDomainScore(
      makeDns({
        dkim: [
          { selector: 'selector1', record: null, valid: false },
          { selector: 'selector2', record: null, valid: false },
        ],
      }),
    )
    const oneValid = computeDomainScore(
      makeDns({
        dkim: [
          { selector: 'selector1', record: null, valid: false },
          { selector: 'google', record: 'v=DKIM1; p=MIIBIjAN', valid: true },
        ],
      }),
    )

    expect(earnedFor(noneValid, 'dkim')).toBe(0)
    expect(earnedFor(oneValid, 'dkim')).toBe(25)
  })

  it('gives partial MTA-STS credit when the policy file is unreachable', () => {
    const result = computeDomainScore(
      makeDns({
        mtaSts: {
          raw: 'v=STSv1; id=20240101T000000',
          valid: true,
          policyFileAccessible: false,
          policyHost: 'mta-sts.example.com',
          mode: 'testing',
          fileAge: null,
          mxRecords: [],
        },
      }),
    )

    expect(earnedFor(result, 'mtaSts')).toBe(3)
    expect(result.bonusScore).toBe(3)
  })

  it('keeps hardening out of the core score', () => {
    const result = computeDomainScore(makeDns(validMtaSts))

    expect(result.coreScore).toBe(0)
    expect(result.bonusScore).toBe(5)
    expect(result.percentage).toBe(5)
    expect(result.grade).toBe('F')
  })
})
