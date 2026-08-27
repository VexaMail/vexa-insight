import type { AttachmentResult, DownloadedPartsResult } from '@/types/imap'
import { parseDmarcFileToResult } from '@/utils/dmarc'
import { getFilenameForPartId } from './getFilenameForPartId'

/**
 * Parses downloaded MIME parts into valid DMARC AttachmentResults (skips non-DMARC or parse failures).
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
    }
  }
  return valid
}
