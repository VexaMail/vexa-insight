import type { ParseResult } from '@/types/dmarc'

/**
 * Validates that a ParseResult has the required DMARC structure.
 * Throws if rawReport, domain, or events are missing or invalid.
 */
export function validateDmarcSignature(parseResult: ParseResult): void {
  if (!parseResult.rawReport) {
    throw new Error('Invalid DMARC XML: missing required structure')
  }
  if (typeof parseResult.domain !== 'string') {
    throw new Error('Invalid DMARC XML: missing required structure')
  }
  if (!Array.isArray(parseResult.events)) {
    throw new Error('Invalid DMARC XML: missing required structure')
  }
}
