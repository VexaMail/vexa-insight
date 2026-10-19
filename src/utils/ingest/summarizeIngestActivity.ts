import type { IngestActivityPoint, IngestActivitySummary } from '@/types/ingest'

/** Totals and daily series of the ingest activity window, oldest first. */
export function summarizeIngestActivity(
  activity: readonly IngestActivityPoint[],
): IngestActivitySummary {
  const sum = (values: readonly number[]) =>
    values.reduce((total, value) => total + value, 0)
  const processed = activity.map((p) => p.processed)
  const ingested = activity.map((p) => p.ingested)
  const failedRuns = activity.map((p) => p.failedRuns)
  return {
    days: activity.length,
    processed: sum(processed),
    ingested: sum(ingested),
    failedRuns: sum(failedRuns),
    processedTrend: processed,
    ingestedTrend: ingested,
    failedRunsTrend: failedRuns,
  }
}
