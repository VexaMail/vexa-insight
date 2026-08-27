import { describe, expect, it } from 'vitest'

import type {
  DiagnosticStats,
  DnsDiagnostics,
  DomainScore,
} from '@/types/diagnostics'
import { buildDiagnosticsAdminGuides } from '../src/services/diagnostics/buildDiagnosticsAdminGuides'

describe('buildDiagnosticsAdminGuides', () => {
  function makeHealthyDns(
    overrides: Partial<DnsDiagnostics> = {},
  ): DnsDiagnostics {
    return {
      domain: 'example.com',
      txtRecords: [],
      spf: 'v=spf1 include:_spf.example.net -all',
      spfValid: true,
      spfWarning: null,
      spfValidationCategories: [],
      spfTree: null,
      dmarc: 'v=DMARC1; p=reject; rua=mailto:dmarc@example.com',
      dmarcPolicy: 'reject',
      dmarcValid: true,
      dmarcWarnings: [],
      dmarcTags: [],
      dkim: [],
      dkimParsedRecords: [
        {
          selector: 'selector1',
          raw: 'v=DKIM1; k=rsa; p=MIIB',
          valid: true,
          version: 'DKIM1',
          keyType: 'rsa',
          keyLengthBits: 2048,
          publicKeyPresent: true,
          errors: [],
        },
      ],
      mx: [{ priority: 10, exchange: 'mx1.example.com' }],
      bimi: {
        raw: 'v=BIMI1; l=https://example.com/logo.svg',
        valid: true,
        logoUrl: 'https://example.com/logo.svg',
        certificateUrl: null,
      },
      mtaSts: {
        raw: 'v=STSv1; id=20240101',
        valid: true,
        policyFileAccessible: true,
        policyHost: 'mta-sts.example.com',
        mode: 'enforce',
        fileAge: null,
        mxRecords: ['mx1.example.com'],
      },
      tlsRpt: {
        raw: 'v=TLSRPTv1; rua=mailto:tlsrpt@example.com',
        valid: true,
        ruaAddresses: ['mailto:tlsrpt@example.com'],
      },
      aRecords: ['203.0.113.10'],
      nsRecords: ['ns1.example.net'],
      ...overrides,
    }
  }

  function makeBrokenDns(): DnsDiagnostics {
    return makeHealthyDns({
      spf: null,
      spfValid: false,
      dmarc: null,
      dmarcPolicy: null,
      dmarcValid: false,
      dkimParsedRecords: [],
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
    })
  }

  function makeQuietStats(
    overrides: Partial<DiagnosticStats> = {},
  ): DiagnosticStats {
    return {
      totalEvents: 100,
      failedEvents: 20,
      spf_pass_unaligned: 0,
      dkim_pass_unaligned: 0,
      spf_auth_fail: 0,
      spf_permerror: 0,
      spf_temperror: 0,
      spf_softfail: 0,
      dkim_all_fail: 0,
      dmarc_override_forwarded: 0,
      dmarc_override_local_policy: 0,
      ...overrides,
    }
  }

  const gradeA: DomainScore = { grade: 'A', percentage: 96 }

  it('returns no guides for a healthy domain with quiet traffic and a good grade', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns(),
      makeQuietStats(),
      gradeA,
    )

    expect(guides).toEqual([])
  })

  it.each(['D', 'F'] as const)(
    'prepends the critical low-overall-score guide for grade %s',
    (grade) => {
      const guides = buildDiagnosticsAdminGuides(
        makeHealthyDns(),
        makeQuietStats(),
        { grade, percentage: 38 },
      )

      expect(guides[0]?.id).toBe('low-overall-score')
      expect(guides[0]?.severity).toBe('critical')
      expect(guides[0]?.summary).toContain(`38% (${grade})`)
    },
  )

  it.each(['A', 'B', 'C'] as const)(
    'does not add the low-overall-score guide for grade %s',
    (grade) => {
      const guides = buildDiagnosticsAdminGuides(
        makeBrokenDns(),
        makeQuietStats(),
        { grade, percentage: 70 },
      )

      expect(guides.map((guide) => guide.id)).not.toContain('low-overall-score')
    },
  )

  it('emits DNS guides for missing records sorted by descending severity', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeBrokenDns(),
      makeQuietStats(),
      { grade: 'B', percentage: 82 },
    )

    expect(guides.map((guide) => guide.id)).toEqual([
      'missing-spf',
      'missing-dmarc',
      'dkim-not-valid',
      'missing-mta-sts',
      'missing-bimi',
      'missing-tlsrpt',
    ])
    expect(guides.map((guide) => guide.severity)).toEqual([
      'high',
      'high',
      'high',
      'medium',
      'low',
      'low',
    ])
  })

  it('caps the output at 6 guides keeping the highest severities in stable order', () => {
    const noisyStats = makeQuietStats({
      totalEvents: 100,
      failedEvents: 20,
      spf_permerror: 5,
      spf_pass_unaligned: 10,
      dkim_all_fail: 10,
      dmarc_override_forwarded: 5,
    })

    const guides = buildDiagnosticsAdminGuides(makeBrokenDns(), noisyStats, {
      grade: 'F',
      percentage: 12,
    })

    expect(guides).toHaveLength(6)
    expect(guides.map((guide) => guide.id)).toEqual([
      'low-overall-score',
      'missing-spf',
      'missing-dmarc',
      'dkim-not-valid',
      'spf-permerror-traffic',
      'dkim-failure-rate',
    ])
  })

  it('reports invalid SPF using the DNS warning as summary', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns({
        spfValid: false,
        spfWarning: 'Multiple SPF records were found.',
      }),
      makeQuietStats(),
      gradeA,
    )

    const invalidSpf = guides.find((guide) => guide.id === 'invalid-spf')
    expect(invalidSpf?.severity).toBe('high')
    expect(invalidSpf?.summary).toBe('Multiple SPF records were found.')
  })

  it('suggests SPF hardening when the record is valid but has a warning', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns({ spfWarning: 'Consider moving from ~all to -all.' }),
      makeQuietStats(),
      gradeA,
    )

    const hardening = guides.find((guide) => guide.id === 'spf-hardening')
    expect(hardening?.severity).toBe('low')
    expect(hardening?.summary).toBe('Consider moving from ~all to -all.')
  })

  it('joins DMARC warnings in the invalid-dmarc guide summary', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns({
        dmarcValid: false,
        dmarcWarnings: ['Invalid tag.', 'Missing rua.'],
      }),
      makeQuietStats(),
      gradeA,
    )

    const invalidDmarc = guides.find((guide) => guide.id === 'invalid-dmarc')
    expect(invalidDmarc?.summary).toBe('Invalid tag. Missing rua.')
  })

  it('flags a monitoring-only DMARC policy as medium severity', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns({
        dmarc: 'v=DMARC1; p=none',
        dmarcPolicy: 'none',
      }),
      makeQuietStats(),
      gradeA,
    )

    const monitoring = guides.find(
      (guide) => guide.id === 'monitoring-only-dmarc',
    )
    expect(monitoring?.severity).toBe('medium')
  })

  it('flags an unreachable MTA-STS policy file as high severity', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns({
        mtaSts: {
          raw: 'v=STSv1; id=20240101',
          valid: true,
          policyFileAccessible: false,
          policyHost: 'mta-sts.example.com',
          mode: 'enforce',
          fileAge: null,
          mxRecords: ['mx1.example.com'],
        },
      }),
      makeQuietStats(),
      gradeA,
    )

    const unreachable = guides.find(
      (guide) => guide.id === 'mtasts-policy-unreachable',
    )
    expect(unreachable?.severity).toBe('high')
    expect(guides.map((guide) => guide.id)).not.toContain('missing-mta-sts')
  })

  it('includes traffic guides at their exact ratio thresholds', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns(),
      makeQuietStats({
        totalEvents: 100,
        failedEvents: 20,
        spf_permerror: 1, // 1/20 = 0.05 (>= 0.05)
        spf_pass_unaligned: 5, // 5/100 = 0.05 (>= 0.05)
        dkim_all_fail: 5, // 5/100 = 0.05 (>= 0.05)
        dmarc_override_forwarded: 2, // 2/20 = 0.10 (>= 0.10)
      }),
      gradeA,
    )

    expect(guides.map((guide) => guide.id)).toEqual([
      'spf-permerror-traffic',
      'dkim-failure-rate',
      'spf-unaligned',
      'forwarding-overrides',
    ])
  })

  it('excludes traffic guides just below their ratio thresholds', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns(),
      makeQuietStats({
        totalEvents: 100,
        failedEvents: 25,
        spf_permerror: 1, // 1/25 = 0.04
        spf_pass_unaligned: 4, // 0.04
        dkim_all_fail: 4, // 0.04
        dmarc_override_forwarded: 2, // 2/25 = 0.08
      }),
      gradeA,
    )

    expect(guides).toEqual([])
  })

  it('produces no traffic guides when there are zero observed events', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDns(),
      makeQuietStats({
        totalEvents: 0,
        failedEvents: 0,
        spf_permerror: 3,
        dkim_all_fail: 3,
        dmarc_override_forwarded: 3,
        spf_pass_unaligned: 3,
      }),
      gradeA,
    )

    expect(guides).toEqual([])
  })
})
