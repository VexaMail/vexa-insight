/**
 * Result of idempotent ingest: whether report was new or skipped.
 */
export type IngestResult =
  | { ingested: true; rawReportId: number }
  | { ingested: false; reason: 'duplicate_report_id' }
