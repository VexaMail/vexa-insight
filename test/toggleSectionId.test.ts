import { toggleSectionId } from '@/utils/diagnostics'
import { describe, expect, it } from 'vitest'

describe('toggleSectionId', () => {
  it('adds an id that is not open yet', () => {
    const next = toggleSectionId(new Set(['spf']), 'dmarc')
    expect([...next]).toEqual(['spf', 'dmarc'])
  })

  it('removes an id that is already open', () => {
    const next = toggleSectionId(new Set(['spf', 'dmarc']), 'spf')
    expect([...next]).toEqual(['dmarc'])
  })

  it('does not mutate the previous set', () => {
    const previous = new Set(['spf'] as const)
    toggleSectionId(previous, 'spf')
    expect(previous.has('spf')).toBe(true)
  })
})
