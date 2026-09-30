import type { TlsReport } from '@/types/tlsrpt'
import { MAX_FILE_SIZE } from '@/utils/dmarc'
import { extractTlsJsonFromBuffer } from './extractTlsJsonFromBuffer'
import { parseTlsReportJson } from './parseTlsReportJson'

/**
 * Parses a TLS report attachment (gzip or plain JSON) with the same size
 * limits as the aggregate reports; null when it is not a valid TLS report.
 */
export function parseTlsReportFileToResult(buffer: Buffer): TlsReport | null {
  if (buffer.length > MAX_FILE_SIZE) return null
  const json = extractTlsJsonFromBuffer(buffer)
  if (json === null) return null
  try {
    return parseTlsReportJson(json)
  } catch {
    return null
  }
}
