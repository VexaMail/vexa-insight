import { describe, expect, it } from 'vitest'

import { buildDiagnosticsAdminGuides } from '../src/services/diagnostics/buildDiagnosticsAdminGuides'
import { GRADE_A_SCORE } from './setup/gradeAScore'
import { makeHealthyDnsDiagnostics } from './setup/makeHealthyDnsDiagnostics'
import { makeQuietDiagnosticStats } from './setup/makeQuietDiagnosticStats'

describe('buildDiagnosticsAdminGuides: traffic thresholds', () => {
  it('includes traffic guides at their exact ratio thresholds', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics(),
      makeQuietDiagnosticStats({
        totalEvents: 100,
        failedEvents: 20,
        spf_permerror: 1, // 1/20 = 0.05 (>= 0.05)
        spf_pass_unaligned: 5, // 5/100 = 0.05 (>= 0.05)
        dkim_all_fail: 5, // 5/100 = 0.05 (>= 0.05)
        dmarc_override_forwarded: 2, // 2/20 = 0.10 (>= 0.10)
      }),
      GRADE_A_SCORE,
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
      makeHealthyDnsDiagnostics(),
      makeQuietDiagnosticStats({
        totalEvents: 100,
        failedEvents: 25,
        spf_permerror: 1, // 1/25 = 0.04
        spf_pass_unaligned: 4, // 0.04
        dkim_all_fail: 4, // 0.04
        dmarc_override_forwarded: 2, // 2/25 = 0.08
      }),
      GRADE_A_SCORE,
    )

    expect(guides).toEqual([])
  })

  it('produces no traffic guides when there are zero observed events', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics(),
      makeQuietDiagnosticStats({
        totalEvents: 0,
        failedEvents: 0,
        spf_permerror: 3,
        dkim_all_fail: 3,
        dmarc_override_forwarded: 3,
        spf_pass_unaligned: 3,
      }),
      GRADE_A_SCORE,
    )

    expect(guides).toEqual([])
  })
})
