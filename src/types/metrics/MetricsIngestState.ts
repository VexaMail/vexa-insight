/** Ingestion side of the metrics snapshot, in Prometheus-friendly scalars. */
export type MetricsIngestState = {
  ingestLastRunTimestampSeconds: number | null
  ingestIsRunning: number
  ingestLastSuccessTotal: number
  ingestLastErrorCount: number
}
