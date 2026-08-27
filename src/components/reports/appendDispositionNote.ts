import type { AuthSummaryNarrative } from './AuthSummaryNarrative'

/**
 * Appends a sentence about the dominant disposition if relevant.
 */
export function appendDispositionNote(
  parts: string[],
  dominantDisposition: string,
  status: AuthSummaryNarrative['status'],
): void {
  if (dominantDisposition === 'none' && status !== 'healthy') {
    parts.push('Disposition remains monitor-only.')
  } else if (dominantDisposition === 'reject') {
    parts.push('Policy is actively rejecting non-compliant mail.')
  } else if (dominantDisposition === 'quarantine') {
    parts.push('Policy is quarantining non-compliant mail.')
  }
}
