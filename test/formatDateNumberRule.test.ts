import {
  formatClockTime,
  formatDate,
  formatDateTime,
  formatPercent,
  formatTimeAgo,
} from '@/utils/format'
import { describe, expect, it } from 'vitest'

describe('the date and number rule', () => {
  const at = new Date('2026-10-16T23:05:40Z')

  it('prints dates, times and date-times in UTC', () => {
    expect(formatDate(at)).toBe('Oct 16, 2026')
    expect(formatClockTime(at)).toBe('23:05 UTC')
    expect(formatDateTime(at)).toBe('Oct 16, 2026 23:05 UTC')
  })

  it('prints relative ages in the long form', () => {
    expect(formatTimeAgo(30)).toBe('just now')
    expect(formatTimeAgo(60)).toBe('1 minute ago')
    expect(formatTimeAgo(3 * 86_400)).toBe('3 days ago')
    expect(formatTimeAgo(65 * 86_400)).toBe('2 months ago')
    expect(formatTimeAgo(400 * 86_400)).toBe('1 year ago')
  })

  it('prints every percentage with one decimal', () => {
    expect(formatPercent(0)).toBe('0.0%')
    expect(formatPercent(100)).toBe('100.0%')
    expect(formatPercent(91.25)).toBe('91.3%')
  })
})
