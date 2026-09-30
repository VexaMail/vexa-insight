import { formatSessionSuccessRate } from '@/utils/format'
import { describe, expect, it } from 'vitest'

describe('formatSessionSuccessRate', () => {
  it('formats the successful share with one decimal', () => {
    expect(formatSessionSuccessRate(120, 4)).toBe('96.8%')
  })

  it('shows a dash when no session was reported', () => {
    expect(formatSessionSuccessRate(0, 0)).toBe('-')
  })
})
