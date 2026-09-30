import type { EnforcementSourceInput } from '@/types/enforcement'
import { computeEnforcementReadiness } from '@/utils/enforcement'
import { describe, expect, it } from 'vitest'

const WINDOW = { days: 30, reportDays: 20 }

function source(
  sourceIp: string,
  messages: number,
  passingMessages: number,
  sender: EnforcementSourceInput['sender'] = null,
): EnforcementSourceInput {
  return { sourceIp, hostname: null, sender, messages, passingMessages }
}

const GOOGLE_GROUPS = {
  name: 'Google Groups',
  category: 'mailing-list' as const,
  matchedOn: 'hostname' as const,
}
const SENDGRID = {
  name: 'SendGrid',
  category: 'email-service' as const,
  matchedOn: 'dkim' as const,
}

describe('computeEnforcementReadiness', () => {
  it('is ready when only forwarded and unknown mail fails', () => {
    const readiness = computeEnforcementReadiness(
      [
        source('192.0.2.1', 10_000, 10_000),
        source('192.0.2.2', 300, 0, GOOGLE_GROUPS),
        source('198.51.100.9', 500, 0),
      ],
      WINDOW,
    )
    expect(readiness).toMatchObject({
      totalMessages: 10_800,
      passingMessages: 10_000,
      failingMessages: 800,
      failingByKind: { legitimate: 0, forwarded: 300, unknown: 500 },
      verdict: 'ready',
    })
    expect(readiness.topFailingSources.map((s) => s.sourceIp)).toEqual([
      '198.51.100.9',
      '192.0.2.2',
    ])
  })

  it('asks to fix a mostly passing sender that still fails', () => {
    const readiness = computeEnforcementReadiness(
      [source('192.0.2.1', 10_000, 9_000)],
      WINDOW,
    )
    expect(readiness.failingByKind.legitimate).toBe(1_000)
    expect(readiness.verdict).toBe('fix-first')
  })

  it('counts a known service that never aligns as legitimate', () => {
    const readiness = computeEnforcementReadiness(
      [
        source('192.0.2.1', 5_000, 5_000),
        source('192.0.2.7', 200, 0, SENDGRID),
      ],
      WINDOW,
    )
    expect(readiness.failingByKind.legitimate).toBe(200)
    expect(readiness.verdict).toBe('fix-first')
  })

  it('tolerates a tiny share of legitimate failures', () => {
    const readiness = computeEnforcementReadiness(
      [source('192.0.2.1', 100_000, 99_900)],
      WINDOW,
    )
    expect(readiness.verdict).toBe('ready')
  })

  it('refuses to judge on too little data', () => {
    expect(
      computeEnforcementReadiness([source('192.0.2.1', 50, 50)], WINDOW)
        .verdict,
    ).toBe('insufficient-data')
    expect(
      computeEnforcementReadiness([source('192.0.2.1', 5_000, 5_000)], {
        days: 30,
        reportDays: 3,
      }).verdict,
    ).toBe('insufficient-data')
  })
})
