import { dmarcCandidateConstants } from './constants/dmarcCandidateConstants'

/**
 * Returns true if the base content-type is in the allowed DMARC candidate set.
 */
export function isAcceptedDmarcContentType(type?: string | null): boolean {
  const lower = (type || '').toLowerCase().split(';')[0]?.trim() || ''
  if (!lower) return false
  return dmarcCandidateConstants.contentTypes.has(lower)
}
