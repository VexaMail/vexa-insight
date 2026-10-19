import {
  mergeDiagnosticsOverviewRows,
  staleDiagnosticsDomainIds,
} from '@/utils/diagnostics'
import { describe, expect, it } from 'vitest'
import { makeOverviewRow } from './setup/makeOverviewRow'

const DAY_MS = 24 * 60 * 60 * 1000
const NOW = Date.parse('2026-10-19T12:00:00.000Z')

describe('diagnostics index refresh queue', () => {
  it('queues never-checked domains first, then stale ones oldest first, and skips fresh ones', () => {
    const rows = [
      makeOverviewRow(1, 'A', { checkedAt: '2026-10-17T00:00:00.000Z' }),
      makeOverviewRow(2, 'A', { checkedAt: '2026-10-19T11:00:00.000Z' }),
      makeOverviewRow(3, null),
      makeOverviewRow(4, 'C', { checkedAt: '2026-10-15T00:00:00.000Z' }),
      makeOverviewRow(5, null),
    ]
    expect(staleDiagnosticsDomainIds(rows, NOW, DAY_MS)).toEqual([3, 5, 4, 1])
  })

  it('replaces only the updated rows and keeps their order', () => {
    const rows = [makeOverviewRow(1, null), makeOverviewRow(2, null)]
    const merged = mergeDiagnosticsOverviewRows(rows, [makeOverviewRow(2, 'A')])
    expect(merged.map((row) => [row.domainId, row.check?.grade])).toEqual([
      [1, undefined],
      [2, 'A'],
    ])
  })
})
