import { DEFAULT_DAYS_BACK } from './defaultDaysBack'

/** The typed days-back count, or the default when it is not at least 1. */
export function parseDaysBackInput(value: string): number {
  const n = parseInt(value, 10)
  return Number.isFinite(n) && n >= 1 ? n : DEFAULT_DAYS_BACK
}
