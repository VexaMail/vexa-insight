import { describe, expect, it } from 'vitest'

import { buildDiagnosticsAdminGuides } from '../src/services/diagnostics/buildDiagnosticsAdminGuides'
import { GRADE_A_SCORE } from './setup/gradeAScore'
import { makeHealthyDnsDiagnostics } from './setup/makeHealthyDnsDiagnostics'
import { makeQuietDiagnosticStats } from './setup/makeQuietDiagnosticStats'

describe('buildDiagnosticsAdminGuides: per-protocol DNS guides', () => {
  it('reports invalid SPF using the DNS warning as summary', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics({
        spfValid: false,
        spfWarning: 'Multiple SPF records were found.',
      }),
      makeQuietDiagnosticStats(),
      GRADE_A_SCORE,
    )

    const invalidSpf = guides.find((guide) => guide.id === 'invalid-spf')
    expect(invalidSpf?.severity).toBe('high')
    expect(invalidSpf?.summary).toBe('Multiple SPF records were found.')
  })

  it('suggests SPF hardening when the record is valid but has a warning', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics({
        spfWarning: 'Consider moving from ~all to -all.',
      }),
      makeQuietDiagnosticStats(),
      GRADE_A_SCORE,
    )

    const hardening = guides.find((guide) => guide.id === 'spf-hardening')
    expect(hardening?.severity).toBe('low')
    expect(hardening?.summary).toBe('Consider moving from ~all to -all.')
  })

  it('joins DMARC warnings in the invalid-dmarc guide summary', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics({
        dmarcValid: false,
        dmarcWarnings: ['Invalid tag.', 'Missing rua.'],
      }),
      makeQuietDiagnosticStats(),
      GRADE_A_SCORE,
    )

    const invalidDmarc = guides.find((guide) => guide.id === 'invalid-dmarc')
    expect(invalidDmarc?.summary).toBe('Invalid tag. Missing rua.')
  })

  it('flags a monitoring-only DMARC policy as medium severity', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics({
        dmarc: 'v=DMARC1; p=none',
        dmarcPolicy: 'none',
      }),
      makeQuietDiagnosticStats(),
      GRADE_A_SCORE,
    )

    const monitoring = guides.find(
      (guide) => guide.id === 'monitoring-only-dmarc',
    )
    expect(monitoring?.severity).toBe('medium')
  })

  it('flags an unreachable MTA-STS policy file as high severity', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics({
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
      makeQuietDiagnosticStats(),
      GRADE_A_SCORE,
    )

    const unreachable = guides.find(
      (guide) => guide.id === 'mtasts-policy-unreachable',
    )
    expect(unreachable?.severity).toBe('high')
    expect(guides.map((guide) => guide.id)).not.toContain('missing-mta-sts')
  })
})
