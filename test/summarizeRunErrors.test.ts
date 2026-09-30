import { describe, expect, it } from 'vitest'
import { summarizeRunErrors } from '../src/utils/ingest/summarizeRunErrors'

describe('summarizeRunErrors', () => {
  it('stores nothing for a clean run', () => {
    expect(summarizeRunErrors([])).toBeNull()
  })

  it('keeps the first five errors and counts the rest', () => {
    const errors = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    expect(summarizeRunErrors(errors)).toBe('a\nb\nc\nd\ne\n(+2 more)')
  })

  it('bounds the stored text', () => {
    const summary = summarizeRunErrors(['x'.repeat(5000)])
    expect(summary).toHaveLength(2000)
    expect(summary?.endsWith('…')).toBe(true)
  })
})
