import type { ParseResult } from '@/types/dmarc'

/**
 * One DMARC report attachment from an email.
 */
export type AttachmentResult = {
  buffer: Buffer
  filename: string
  parsed?: ParseResult
}
