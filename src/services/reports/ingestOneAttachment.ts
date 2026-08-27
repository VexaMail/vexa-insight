import { parseDmarcFile } from '@/services/dmarc'
import type { AttachmentResult } from '@/types/imap'
import type { IngestOneAttachmentResult } from '@/types/reports'
import { ingestParsedReport } from './ingestParsedReport'

/**
 * Parses one DMARC attachment (or uses att.parsed) and ingests; returns ingested flag or error.
 */
export async function ingestOneAttachment(
  att: AttachmentResult,
): Promise<IngestOneAttachmentResult> {
  try {
    const report =
      att.parsed ?? (await parseDmarcFile(att.buffer, att.filename))
    const ingest = await ingestParsedReport(report)
    return { ingested: ingest.ingested }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { error: `${att.filename}: ${message}`, ingested: false }
  }
}
