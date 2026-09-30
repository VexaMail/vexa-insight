import { FORENSIC_HEADER_SECTION_MAX_BYTES } from '@/constants/forensic'

/**
 * The header section of a reported message (a `text/rfc822-headers` part or
 * a whole `message/rfc822` part): everything before the first empty line,
 * capped in size. The body, if any, is never returned.
 */
export function headerSectionOf(content: Buffer): string {
  const text = content
    .subarray(0, FORENSIC_HEADER_SECTION_MAX_BYTES)
    .toString('utf-8')
    .replace(/\r\n/g, '\n')
  const end = text.indexOf('\n\n')
  return end === -1 ? text : text.slice(0, end)
}
