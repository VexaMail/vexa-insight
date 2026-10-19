import type { DiagnosticsOverviewRow } from '@/types/diagnostics'
import { buildFindingSteps, filterDiagnosticsRows } from '@/utils/diagnostics'
import { describe, expect, it } from 'vitest'
import { makeDomainScore } from './setup/makeDomainScore'

function row(
  domainName: string,
  grade: 'A' | 'C' | 'F',
  resolved = true,
): DiagnosticsOverviewRow {
  return {
    domainName,
    score: makeDomainScore(grade, grade === 'A' ? 95 : 40),
    findings: [],
    checkedAt: '2026-10-19T00:00:00.000Z',
    resolved,
  }
}

describe('diagnostics index filter and finding steps', () => {
  const rows = [
    row('a.example.com', 'A'),
    row('c.example.com', 'C'),
    row('f.example.com', 'F'),
    row('x.example.com', 'F', false),
  ]

  it('keeps one grade band, and puts a domain with no DNS answer in unscored', () => {
    expect(
      filterDiagnosticsRows(rows, 'poor').map((r) => r.domainName),
    ).toEqual(['f.example.com'])
    expect(
      filterDiagnosticsRows(rows, 'unscored').map((r) => r.domainName),
    ).toEqual(['x.example.com'])
    expect(filterDiagnosticsRows(rows, 'all')).toHaveLength(4)
  })

  it('states observed, expected, fix and verify from the finding itself', () => {
    const steps = buildFindingSteps({
      id: 'dmarc',
      protocol: 'DMARC',
      check: 'DMARC policy',
      severity: 'high',
      state: 'p=none (monitoring only)',
      detail: 'Receivers take no action on failing mail.',
      observed: 'v=DMARC1; p=none',
      recommendation: 'Move to p=quarantine.',
      fix: { host: '_dmarc.example.com', value: 'v=DMARC1; p=quarantine' },
      tileValue: 'none',
      tileHint: 'monitoring',
      section: 'dmarc',
    })
    expect(steps.map((s) => s.key)).toEqual([
      'observed',
      'expected',
      'fix',
      'verify',
    ])
    expect(steps[0]?.code).toBe('v=DMARC1; p=none')
    expect(steps[1]?.code).toBe('v=DMARC1; p=quarantine')
    expect(steps[3]?.code).toBe('dig +short TXT _dmarc.example.com')
  })
})
