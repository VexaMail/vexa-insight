import { DEFAULT_DAYS_BACK } from './defaultDaysBack'

/**
 * Parses the ingestion window in days. Scheduled runs always use a window: 0
 * ("no limit") is no longer accepted here, a full-mailbox pass is an explicit
 * one-off action instead. Out-of-range input falls back to the default.
 */
export function parseIngestionDaysBack(v: unknown): number {
  if (v === undefined) return DEFAULT_DAYS_BACK
  const n = typeof v === 'number' ? v : parseInt(String(v), 10)
  return Number.isFinite(n) && n >= 1 && n <= 365 ? n : DEFAULT_DAYS_BACK
}
