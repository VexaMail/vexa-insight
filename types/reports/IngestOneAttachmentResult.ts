/**
 * Result of ingesting one DMARC attachment (parse + ingest, or error).
 */
export type IngestOneAttachmentResult = {
  error?: string
  ingested: boolean
}
