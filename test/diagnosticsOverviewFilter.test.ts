import {
  buildFindingSteps,
  countGradeBands,
  filterDiagnosticsRows,
} from '@/utils/diagnostics'
import { describe, expect, it } from 'vitest'
import { makeOverviewRow } from './setup/makeOverviewRow'

describe('diagnostics index filter and finding steps', () => {
  const rows = [
    makeOverviewRow(1, 'A'),
    makeOverviewRow(2, 'C'),
    makeOverviewRow(3, 'F'),
    makeOverviewRow(4, 'F', { resolved: false }),
    makeOverviewRow(5, null),
  ]

  it('keeps one grade band, and puts a domain with no DNS answer in unscored', () => {
    expect(filterDiagnosticsRows(rows, 'poor').map((r) => r.domainId)).toEqual([
      3,
    ])
    expect(
      filterDiagnosticsRows(rows, 'unscored').map((r) => r.domainId),
    ).toEqual([4])
    expect(filterDiagnosticsRows(rows, 'all')).toHaveLength(5)
  })

  it('counts a never-checked domain as pending, in no grade band', () => {
    expect(countGradeBands(rows)).toEqual({
      total: 5,
      poor: 1,
      fair: 1,
      good: 1,
      unresolved: 1,
      pending: 1,
    })
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
