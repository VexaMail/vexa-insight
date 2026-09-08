import { describe, expect, it } from 'vitest'

import { buildDiagnosticsAdminGuides } from '../src/services/diagnostics/buildDiagnosticsAdminGuides'
import { GRADE_A_SCORE } from './setup/gradeAScore'
import { makeBrokenDnsDiagnostics } from './setup/makeBrokenDnsDiagnostics'
import { makeHealthyDnsDiagnostics } from './setup/makeHealthyDnsDiagnostics'
import { makeQuietDiagnosticStats } from './setup/makeQuietDiagnosticStats'

const LOW_SCORE_GUIDE = 'low-overall-score'

describe('buildDiagnosticsAdminGuides: selection, order and cap', () => {
  it('returns no guides for a healthy domain with quiet traffic and a good grade', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeHealthyDnsDiagnostics(),
      makeQuietDiagnosticStats(),
      GRADE_A_SCORE,
    )

    expect(guides).toEqual([])
  })

  it.each(['D', 'F'] as const)(
    'prepends the critical low-overall-score guide for grade %s',
    (grade) => {
      const guides = buildDiagnosticsAdminGuides(
        makeHealthyDnsDiagnostics(),
        makeQuietDiagnosticStats(),
        { grade, percentage: 38 },
      )

      expect(guides[0]?.id).toBe(LOW_SCORE_GUIDE)
      expect(guides[0]?.severity).toBe('critical')
      expect(guides[0]?.summary).toContain(`38% (${grade})`)
    },
  )

  it.each(['A', 'B', 'C'] as const)(
    'does not add the low-overall-score guide for grade %s',
    (grade) => {
      const guides = buildDiagnosticsAdminGuides(
        makeBrokenDnsDiagnostics(),
        makeQuietDiagnosticStats(),
        { grade, percentage: 70 },
      )

      expect(guides.map((guide) => guide.id)).not.toContain(LOW_SCORE_GUIDE)
    },
  )

  it('emits DNS guides for missing records sorted by descending severity', () => {
    const guides = buildDiagnosticsAdminGuides(
      makeBrokenDnsDiagnostics(),
      makeQuietDiagnosticStats(),
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
    const noisyStats = makeQuietDiagnosticStats({
      totalEvents: 100,
      failedEvents: 20,
      spf_permerror: 5,
      spf_pass_unaligned: 10,
      dkim_all_fail: 10,
      dmarc_override_forwarded: 5,
    })

    const guides = buildDiagnosticsAdminGuides(
      makeBrokenDnsDiagnostics(),
      noisyStats,
      { grade: 'F', percentage: 12 },
    )

    expect(guides).toHaveLength(6)
    expect(guides.map((guide) => guide.id)).toEqual([
      LOW_SCORE_GUIDE,
      'missing-spf',
      'missing-dmarc',
      'dkim-not-valid',
      'spf-permerror-traffic',
      'dkim-failure-rate',
    ])
  })
})
