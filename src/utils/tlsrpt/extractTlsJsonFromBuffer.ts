import { MAX_UNCOMPRESSED_SIZE } from '@/utils/dmarc'
import { gunzipSync } from 'node:zlib'
import { isGzipBuffer } from './isGzipBuffer'
import { startsWithJsonObject } from './startsWithJsonObject'

/**
 * JSON bytes of a TLS report attachment: gunzipped when it carries the gzip
 * magic bytes, as is when it already opens with `{`. Detection is by content
 * because reporters disagree on filenames and content types.
 * @returns the JSON buffer, or null when the bytes are neither
 */
export function extractTlsJsonFromBuffer(content: Buffer): Buffer | null {
  if (isGzipBuffer(content)) {
    try {
      const json = gunzipSync(content, {
        maxOutputLength: MAX_UNCOMPRESSED_SIZE,
      })
      return startsWithJsonObject(json) ? json : null
    } catch {
      return null
    }
  }
  return startsWithJsonObject(content) ? content : null
}
