/**
 * Outcome of storing one TLS-RPT report: a report already stored under the
 * same organisation and report id is skipped, not an error.
 */
export type TlsIngestResult =
  | { ingested: true; tlsReportId: number }
  | { ingested: false; reason: 'duplicate_report_id' }
