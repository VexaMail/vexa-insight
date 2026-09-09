import { diagnosticsSectionDomId } from '@/utils/diagnostics'
import { describe, expect, it } from 'vitest'

describe('diagnosticsSectionDomId', () => {
  it('prefixes the section id so it cannot collide with other page ids', () => {
    expect(diagnosticsSectionDomId('mta-sts')).toBe(
      'diagnostics-section-mta-sts',
    )
  })
})
