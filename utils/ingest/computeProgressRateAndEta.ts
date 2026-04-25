import { formatEta } from '@/utils/format'

/**
 * Computes messages-per-second rate and ETA string from job progress.
 * @param currentProcessed - Number of emails processed so far
 * @param totalEmails - Total emails to process
 * @param jobStartTimeMs - Timestamp when job started (Date.now() when currentProcessed was 0), or null
 */
export function computeProgressRateAndEta(
  currentProcessed: number,
  totalEmails: number,
  jobStartTimeMs: number | null,
): { ratePerSecond: number; etaFormatted: string } {
  if (jobStartTimeMs == null) {
    return { ratePerSecond: 0, etaFormatted: 'Calculating…' }
  }
  const elapsedSec = (Date.now() - jobStartTimeMs) / 1000
  const ratePerSecond = elapsedSec > 0 ? currentProcessed / elapsedSec : 0
  const remaining = Math.max(0, totalEmails - currentProcessed)
  if (ratePerSecond <= 0 || remaining <= 0) {
    return {
      ratePerSecond,
      etaFormatted: remaining <= 0 ? '0s' : 'Calculating…',
    }
  }
  const etaSeconds = remaining / ratePerSecond
  return {
    ratePerSecond,
    etaFormatted: formatEta(etaSeconds * 1000),
  }
}
