import type { ParseResult } from '@/types/dmarc'
import type { ForensicReport } from '@/types/forensic'
import type { TlsReport } from '@/types/tlsrpt'

/**
 * One report attachment from an email: a DMARC aggregate report in
 * `parsed`, an SMTP TLS report in `tlsReport`, or a failure report in
 * `forensicReport`.
 */
export type AttachmentResult = {
  buffer: Buffer
  filename: string
  parsed?: ParseResult
  tlsReport?: TlsReport
  forensicReport?: ForensicReport
}
