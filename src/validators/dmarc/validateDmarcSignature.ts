import type { ParseResult } from '@/types/dmarc'

/**
 * Validates the parsed fields whose runtime shapes come from XML input.
 * Throws if domain or events are invalid.
 */
export function validateDmarcSignature(parseResult: ParseResult): void {
  if (typeof parseResult.domain !== 'string') {
    throw new Error('Invalid DMARC XML: missing required structure')
  }
  if (!Array.isArray(parseResult.events)) {
    throw new Error('Invalid DMARC XML: missing required structure')
  }
}
