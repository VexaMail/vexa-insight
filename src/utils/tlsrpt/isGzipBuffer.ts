/** Whether the bytes start with the gzip magic number (RFC 1952). */
export function isGzipBuffer(content: Buffer): boolean {
  return content.length >= 2 && content[0] === 0x1f && content[1] === 0x8b
}
