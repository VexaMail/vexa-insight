import type { ParseResult } from '@/types/dmarc'
import {
  MAX_UNCOMPRESSED_SIZE,
  extractXmlFromBuffer,
  parseDmarcXml,
} from '@/utils/dmarc'
import { MAX_FILE_SIZE } from '../../utils/dmarc/maxFileSize'

/**
 * Parses a DMARC report file (ZIP, GZIP, or XML).
 * Enforces size limits; throws on invalid content or limits exceeded.
 */
export async function parseDmarcFile(
  fileContent: Buffer,
  filename: string,
): Promise<ParseResult> {
  if (fileContent.length > MAX_FILE_SIZE) {
    throw new Error(
      `File too large. Maximum size is ${String(MAX_FILE_SIZE / 1024 / 1024)} MB`,
    )
  }
  const xmlBuffer = await extractXmlFromBuffer(fileContent, filename)
  if (!xmlBuffer) {
    throw new Error('Could not extract XML content from file')
  }
  if (xmlBuffer.length > MAX_UNCOMPRESSED_SIZE) {
    throw new Error(
      `Uncompressed content too large. Max ${String(MAX_UNCOMPRESSED_SIZE / 1024 / 1024)} MB. Possible zip bomb.`,
    )
  }
  return parseDmarcXml(xmlBuffer)
}
