import type { ParseResult } from '@/types/dmarc'
import { validateDmarcSignature } from '../../validators/dmarc/validateDmarcSignature'
import { MAX_UNCOMPRESSED_SIZE } from './constants'
import { extractXmlFromBuffer } from './extractXmlFromBuffer'
import { MAX_FILE_SIZE } from './maxFileSize'
import { parseDmarcXml } from './parseDmarcXml'

/**
 * Parses a DMARC report file (ZIP, GZIP, or XML) to ParseResult.
 * Enforces size limits; returns null on invalid content, limits exceeded, or any thrown error.
 */
export async function parseDmarcFileToResult(
  buffer: Buffer,
  filename: string,
): Promise<ParseResult | null> {
  try {
    if (buffer.length > MAX_FILE_SIZE) {
      return null
    }
    const xmlBuffer = await extractXmlFromBuffer(buffer, filename)
    if (!xmlBuffer) {
      return null
    }
    if (xmlBuffer.length > MAX_UNCOMPRESSED_SIZE) {
      return null
    }
    const result = parseDmarcXml(xmlBuffer)
    validateDmarcSignature(result)
    return result
  } catch {
    return null
  }
}
