/**
 * Outcome of storing one failure report. A report mail already stored is a
 * duplicate; a domain over its daily cap is skipped so a broken forwarder
 * cannot fill the database.
 */
export type ForensicIngestResult =
  | { ingested: true; forensicReportId: number }
  | { ingested: false; reason: 'duplicate' | 'daily_cap' }
