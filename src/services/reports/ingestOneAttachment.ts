import { parseDmarcFile } from '@/services/dmarc'
import { ingestTlsReport } from '@/services/tlsrpt'
import type { AttachmentResult } from '@/types/imap'
import type { IngestOneAttachmentResult } from '@/types/reports'
import { ingestParsedReport } from './ingestParsedReport'

/**
 * Ingests one attachment: its TLS report when it carries one, else its DMARC
 * report (parsing the file when att.parsed is absent). Returns the ingested
 * flag or an error.
 */
export async function ingestOneAttachment(
  att: AttachmentResult,
): Promise<IngestOneAttachmentResult> {
  try {
    if (att.tlsReport) {
      return { ingested: ingestTlsReport(att.tlsReport).ingested }
    }
    const report =
      att.parsed ?? (await parseDmarcFile(att.buffer, att.filename))
    const ingest = await ingestParsedReport(report)
    return { ingested: ingest.ingested }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { error: `${att.filename}: ${message}`, ingested: false }
  }
}
