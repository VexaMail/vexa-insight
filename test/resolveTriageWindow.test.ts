import { resolveTriageWindow, unixDay } from '@/utils/dashboard'
import { describe, expect, it } from 'vitest'

describe('resolveTriageWindow', () => {
  const now = new Date('2026-10-19T03:00:00Z')
  const today = unixDay(now)

  it('makes "last 30 days" today plus the 29 days before, and the 30 before that', () => {
    const w = resolveTriageWindow({ days: 30, now })
    expect(w.current).toEqual({ fromDay: today - 29, toDay: today })
    expect(w.previous).toEqual({ fromDay: today - 59, toDay: today - 30 })
    expect(w.lengthDays).toBe(30)
    expect(w.label).toBe('last 30 days')
  })

  it('compares a custom range with the same number of days before it', () => {
    const w = resolveTriageWindow({
      days: 30,
      from: new Date('2026-10-01T00:00:00Z'),
      to: new Date('2026-10-10T00:00:00Z'),
      now,
    })
    expect(w.lengthDays).toBe(10)
    expect(w.previous?.toDay).toBe(w.current.fromDay - 1)
    expect(w.label).toBe('2026-10-01 to 2026-10-10')
  })

  it('has no previous period for all time', () => {
    const w = resolveTriageWindow({ days: 9999, now })
    expect(w.previous).toBeNull()
    expect(w.current.fromDay).toBe(0)
    expect(w.label).toBe('all time')
  })
})
