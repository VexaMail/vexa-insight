import type { DiagnosticsOverviewRow, DomainScore } from '@/types/diagnostics'

/** An index row with a stored run, or none when `grade` is null. */
export function makeOverviewRow(
  domainId: number,
  grade: DomainScore['grade'] | null,
  options: { resolved?: boolean; checkedAt?: string } = {},
): DiagnosticsOverviewRow {
  return {
    domainId,
    domainName: `example${String(domainId)}.com`,
    check:
      grade === null
        ? null
        : {
            checkedAt: options.checkedAt ?? '2026-10-19T00:00:00.000Z',
            resolved: options.resolved ?? true,
            grade,
            percentage: grade === 'A' ? 95 : 40,
            protocols: [],
          },
  }
}
