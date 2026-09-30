import type { ParseResult } from '@/types/dmarc'
import type { TlsReport } from '@/types/tlsrpt'

/**
 * One report attachment from an email: a DMARC aggregate report in
 * `parsed`, or an SMTP TLS report in `tlsReport`.
 */
export type AttachmentResult = {
  buffer: Buffer
  filename: string
  parsed?: ParseResult
  tlsReport?: TlsReport
}
