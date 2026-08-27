import { dmarcCandidateConstants } from './constants/dmarcCandidateConstants'

/**
 * Returns true if the content-type is excluded (e.g. message/rfc822, text/html).
 */
export function isExcludedDmarcType(type?: string | null): boolean {
  const lower = (type || '').toLowerCase().split(';')[0]?.trim() || ''
  if (!lower) return false
  return dmarcCandidateConstants.excludedTypes.has(lower)
}
