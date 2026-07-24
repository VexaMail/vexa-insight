import type { DnsDiagnostics } from '@/types/diagnostics'
import { describe, expect, it } from 'vitest'
import { computeDomainScore } from '../services/diagnostics/computeDomainScore'

describe('computeDomainScore', () => {
  function makeDns(overrides: Partial<DnsDiagnostics> = {}): DnsDiagnostics {
    return {
      domain: 'example.com',
      txtRecords: [],
      spf: null,
      spfValid: false,
      spfWarning: null,
      spfValidationCategories: [],
      spfTree: null,
      dmarc: null,
      dmarcPolicy: null,
      dmarcValid: false,
      dmarcWarnings: [],
      dmarcTags: [],
      dkim: [],
      dkimParsedRecords: [],
      mx: [],
      bimi: { raw: null, valid: false, logoUrl: null, certificateUrl: null },
      mtaSts: {
        raw: null,
        valid: false,
        policyFileAccessible: false,
        policyHost: null,
        mode: null,
        fileAge: null,
        mxRecords: [],
      },
      tlsRpt: { raw: null, valid: false, ruaAddresses: [] },
      aRecords: [],
      nsRecords: [],
      ...overrides,
    }
  }

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
    dmarc: 'v=DMARC1; p=reject',
    dmarcPolicy: 'reject',
    dmarcValid: true,
  }

  const dmarcQuarantine = {
    dmarc: 'v=DMARC1; p=quarantine',
    dmarcPolicy: 'quarantine',
    dmarcValid: true,
  }

  const dmarcNone = {
    dmarc: 'v=DMARC1; p=none',
    dmarcPolicy: 'none',
    dmarcValid: true,
  }

  it('scores 0 with grade F when nothing is configured', () => {
    const result = computeDomainScore(makeDns())

    expect(result.percentage).toBe(0)
    expect(result.grade).toBe('F')
  })

  it('scores 100 with grade A for a fully configured domain', () => {
    const result = computeDomainScore(
      makeDns({
        ...validSpf,
        ...validDkim,
        ...dmarcReject,
        bimi: {
          raw: 'v=BIMI1; l=https://example.com/logo.svg',
          valid: true,
          logoUrl: 'https://example.com/logo.svg',
          certificateUrl: null,
        },
        mtaSts: {
          raw: 'v=STSv1; id=20240101T000000',
          valid: true,
          policyFileAccessible: true,
          policyHost: 'mta-sts.example.com',
          mode: 'enforce',
          fileAge: null,
          mxRecords: ['mx.example.com'],
        },
        tlsRpt: {
          raw: 'v=TLSRPTv1; rua=mailto:tls@example.com',
          valid: true,
          ruaAddresses: ['mailto:tls@example.com'],
        },
      }),
    )

    expect(result.percentage).toBe(100)
    expect(result.grade).toBe('A')
  })

  it('gives partial SPF credit when a record exists but is invalid', () => {
    const result = computeDomainScore(
      makeDns({ spf: 'v=spf1 -all v=spf1', spfValid: false }),
    )

    expect(result.percentage).toBe(10)
    expect(result.grade).toBe('F')
  })

  it('gives partial DMARC credit when a record exists but is invalid', () => {
    const result = computeDomainScore(
      makeDns({ dmarc: 'v=DMARC1', dmarcPolicy: null, dmarcValid: false }),
    )

    expect(result.percentage).toBe(5)
  })

  it('scores quarantine policy lower than reject', () => {
    const reject = computeDomainScore(makeDns(dmarcReject))
    const quarantine = computeDomainScore(makeDns(dmarcQuarantine))
    const none = computeDomainScore(makeDns(dmarcNone))

    expect(reject.percentage).toBe(30)
    expect(quarantine.percentage).toBe(25)
    expect(none.percentage).toBe(15)
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

    expect(noneValid.percentage).toBe(0)
    expect(oneValid.percentage).toBe(20)
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

    expect(result.percentage).toBe(5)
  })

  it('grades exactly 80 as A', () => {
    const result = computeDomainScore(
      makeDns({
        ...validSpf,
        ...validDkim,
        ...dmarcReject,
        bimi: {
          raw: 'v=BIMI1;',
          valid: true,
          logoUrl: null,
          certificateUrl: null,
        },
      }),
    )

    expect(result.percentage).toBe(80)
    expect(result.grade).toBe('A')
  })

  it('grades 75 as B', () => {
    const result = computeDomainScore(
      makeDns({
        ...validSpf,
        ...validDkim,
        ...dmarcQuarantine,
        tlsRpt: { raw: 'v=TLSRPTv1;', valid: true, ruaAddresses: [] },
      }),
    )

    expect(result.percentage).toBe(75)
    expect(result.grade).toBe('B')
  })

  it('grades exactly 60 as B', () => {
    const result = computeDomainScore(
      makeDns({
        ...validSpf,
        ...validDkim,
        ...dmarcNone,
        mtaSts: {
          raw: 'v=STSv1;',
          valid: true,
          policyFileAccessible: false,
          policyHost: null,
          mode: null,
          fileAge: null,
          mxRecords: [],
        },
      }),
    )

    expect(result.percentage).toBe(60)
    expect(result.grade).toBe('B')
  })

  it('grades 55 as C', () => {
    const result = computeDomainScore(
      makeDns({ ...validSpf, ...validDkim, ...dmarcNone }),
    )

    expect(result.percentage).toBe(55)
    expect(result.grade).toBe('C')
  })

  it('grades exactly 40 as C', () => {
    const result = computeDomainScore(makeDns({ ...validSpf, ...validDkim }))

    expect(result.percentage).toBe(40)
    expect(result.grade).toBe('C')
  })

  it('grades 35 as D', () => {
    const result = computeDomainScore(makeDns({ ...validSpf, ...dmarcNone }))

    expect(result.percentage).toBe(35)
    expect(result.grade).toBe('D')
  })

  it('grades exactly 20 as D', () => {
    const result = computeDomainScore(makeDns(validSpf))

    expect(result.percentage).toBe(20)
    expect(result.grade).toBe('D')
  })

  it('grades 15 as F', () => {
    const result = computeDomainScore(makeDns(dmarcNone))

    expect(result.percentage).toBe(15)
    expect(result.grade).toBe('F')
  })
})
