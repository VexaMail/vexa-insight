import { computeReportStats } from '@/utils/reports'
import { describe, expect, it } from 'vitest'

describe('computeReportStats', () => {
  it('counts a message aligned on DKIM only as passing DMARC', () => {
    // The shape of a single-message report where SPF fails alignment and DKIM
    // aligns: it once read "DKIM aligned 100%" next to "Compliance 0%".
    const stats = computeReportStats(
      {
        totalMessages: 1,
        spfAlignedCount: 0,
        dkimAlignedCount: 1,
        bothAlignedCount: 0,
        dmarcPassCount: 1,
      },
      1,
    )

    expect(stats.complianceRate).toBe(100)
    expect(stats.fullyAlignedRate).toBe(0)
    expect(stats.spfAlignedRate).toBe(0)
    expect(stats.dkimAlignedRate).toBe(100)
    expect(stats.sourcesRequiringReviewCount).toBe(1)
  })

  it('keeps compliance at least as high as either alignment rate', () => {
    const stats = computeReportStats(
      {
        totalMessages: 200,
        spfAlignedCount: 120,
        dkimAlignedCount: 150,
        bothAlignedCount: 100,
        dmarcPassCount: 170,
      },
      3,
    )

    expect(stats.complianceRate).toBe(85)
    expect(stats.fullyAlignedRate).toBe(50)
    expect(stats.complianceRate).toBeGreaterThanOrEqual(stats.dkimAlignedRate)
    expect(stats.complianceRate).toBeGreaterThanOrEqual(stats.spfAlignedRate)
  })

  it('reports zero rates for an empty report', () => {
    const stats = computeReportStats(
      {
        totalMessages: 0,
        spfAlignedCount: 0,
        dkimAlignedCount: 0,
        bothAlignedCount: 0,
        dmarcPassCount: 0,
      },
      0,
    )

    expect(stats.complianceRate).toBe(0)
    expect(stats.fullyAlignedRate).toBe(0)
  })
})
