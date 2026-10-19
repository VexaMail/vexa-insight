import type { HealthVerdict, ReportFreshness } from '@/types/ingest'

/**
 * Receivers send aggregate reports about daily, so no new report for two
 * days needs a look and a week without one means the pipeline is dry.
 */
export function freshnessVerdict(
  reports: ReportFreshness,
  now: Date,
): HealthVerdict {
  if (!reports.lastIngestedAt) return { tone: 'unknown', label: 'No reports' }
  const hours = (now.getTime() - reports.lastIngestedAt.getTime()) / 3_600_000
  if (hours > 24 * 7) return { tone: 'danger', label: 'Dry for a week' }
  if (hours > 48) return { tone: 'warning', label: 'Quiet for 2 days' }
  return { tone: 'success', label: 'Fresh' }
}
