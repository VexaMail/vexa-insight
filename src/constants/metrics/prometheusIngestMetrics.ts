import type { PrometheusScalarMetric } from '@/types/metrics'

/** Ingestion series of the metrics endpoint. */
export const PROMETHEUS_INGEST_METRICS: PrometheusScalarMetric[] = [
  {
    name: 'vexa_ingest_last_run_timestamp_seconds',
    help: 'Unix timestamp of the last ingest run.',
    type: 'gauge',
    read: (snapshot) => snapshot.ingestLastRunTimestampSeconds ?? 0,
  },
  {
    name: 'vexa_ingest_running',
    help: '1 if an ingest job is currently running.',
    type: 'gauge',
    read: (snapshot) => snapshot.ingestIsRunning,
  },
  {
    name: 'vexa_ingest_last_run_processed',
    help: 'Number of items processed in the most recent ingest run.',
    type: 'gauge',
    read: (snapshot) => snapshot.ingestLastSuccessTotal,
  },
  {
    name: 'vexa_ingest_last_run_errors',
    help: 'Number of errors in the most recent ingest run.',
    type: 'gauge',
    read: (snapshot) => snapshot.ingestLastErrorCount,
  },
]
