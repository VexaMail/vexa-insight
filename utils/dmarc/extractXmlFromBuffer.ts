import { gunzipSync } from 'node:zlib'
import { extractXmlFromZip } from './extractXmlFromZip'

/**
 * Extracts XML bytes from a buffer (ZIP, GZIP, or plain XML).
 * Enforces size limits and zip-bomb protection.
 * @returns XML buffer or null if format not supported
 */
export async function extractXmlFromBuffer(
  fileContent: Buffer,
  filename: string,
): Promise<Buffer | null> {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.zip')) {
    return extractXmlFromZip(fileContent)
  }
  if (lower.endsWith('.gz') || lower.endsWith('.gzip')) {
    try {
      return gunzipSync(fileContent)
    } catch {
      return null
    }
  }
  if (lower.endsWith('.xml')) {
    return fileContent
  }
  return null
}
