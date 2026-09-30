import type { AttachmentResult, DownloadedPartsResult } from '@/types/imap'
import { parseDmarcFileToResult } from '@/utils/dmarc'
import { parseTlsReportFileToResult } from '@/utils/tlsrpt'
import { getFilenameForPartId } from './getFilenameForPartId'

/**
 * Parses downloaded MIME parts into AttachmentResults: a DMARC aggregate
 * report when the part is one, else an SMTP TLS report. Parts that are
 * neither are skipped.
 */
export async function parseDmarcAttachmentsFromParts(
  partsResult: DownloadedPartsResult,
  partIds: string[],
  bodyStructure: unknown,
): Promise<AttachmentResult[]> {
  const valid: AttachmentResult[] = []
  for (const partId of partIds) {
    const partData = partsResult[partId]
    if (!partData?.content) continue
    const filename =
      getFilenameForPartId(bodyStructure, partId) ??
      partData.meta?.filename ??
      'attachment'
    const result = await parseDmarcFileToResult(partData.content, filename)
    if (result !== null) {
      valid.push({
        buffer: partData.content,
        filename,
        parsed: result,
      })
      continue
    }
    const tlsReport = parseTlsReportFileToResult(partData.content)
    if (tlsReport !== null) {
      valid.push({ buffer: partData.content, filename, tlsReport })
    }
  }
  return valid
}
