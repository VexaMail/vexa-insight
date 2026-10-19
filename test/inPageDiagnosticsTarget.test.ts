import { describe, expect, it } from 'vitest'

import { inPageDiagnosticsTarget } from '@/utils/diagnostics'

const current = new URL(
  'https://vexa.example.com/diagnostics/example.com?days=30&tab=findings',
)

describe('inPageDiagnosticsTarget', () => {
  it('keeps a link that only changes the tab and the anchor', () => {
    const target = inPageDiagnosticsTarget(
      '/diagnostics/example.com?days=30&tab=auth#diagnostics-section-dmarc',
      current,
    )

    expect(target?.searchParams.get('tab')).toBe('auth')
    expect(target?.hash).toBe('#diagnostics-section-dmarc')
  })

  it('ignores the order of the other parameters', () => {
    const withRange = new URL(
      'https://vexa.example.com/diagnostics/example.com?from=2026-01-01&days=7',
    )

    expect(
      inPageDiagnosticsTarget(
        '/diagnostics/example.com?tab=dns&days=7&from=2026-01-01',
        withRange,
      ),
    ).not.toBeNull()
  })

  it('leaves a change of window to the server', () => {
    expect(
      inPageDiagnosticsTarget(
        '/diagnostics/example.com?days=7&tab=dns',
        current,
      ),
    ).toBeNull()
  })

  it('leaves another domain or page to the server', () => {
    expect(
      inPageDiagnosticsTarget('/diagnostics/example.org?days=30', current),
    ).toBeNull()
    expect(inPageDiagnosticsTarget('/domains/example.com', current)).toBeNull()
    expect(
      inPageDiagnosticsTarget(
        'https://other.example.net/diagnostics/example.com?days=30',
        current,
      ),
    ).toBeNull()
  })
})
