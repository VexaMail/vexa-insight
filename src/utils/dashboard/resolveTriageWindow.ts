import { ALL_TIME_DAYS } from '@/constants/dashboard'
import type { TriageWindow, TriageWindowInput } from '@/types/dashboard'
import { triageWindowLabel } from './triageWindowLabel'
import { unixDay } from './unixDay'

/**
 * Turns the URL's date filter into whole UTC report days: "last 30 days" is
 * today and the 29 days before it, and the previous period is the 30 days
 * before that. Both use the rollup's day buckets, so every figure on the
 * overview counts the same messages.
 */
export function resolveTriageWindow(input: TriageWindowInput): TriageWindow {
  const toDay = unixDay(input.to ?? input.now)
  if (!input.from && input.days >= ALL_TIME_DAYS) {
    const current = { fromDay: 0, toDay }
    return { current, previous: null, lengthDays: toDay + 1, label: 'all time' }
  }
  const fromDay = input.from
    ? Math.min(unixDay(input.from), toDay)
    : toDay - input.days + 1
  const lengthDays = toDay - fromDay + 1
  const current = { fromDay, toDay }
  return {
    current,
    previous: { fromDay: fromDay - lengthDays, toDay: fromDay - 1 },
    lengthDays,
    label: triageWindowLabel(current, input.from ? null : input.days),
  }
}
