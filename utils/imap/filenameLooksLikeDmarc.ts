import { dmarcCandidateConstants } from './constants/dmarcCandidateConstants'

/**
 * Returns true if filename has a DMARC-like extension or contains a DMARC hint.
 */
export function filenameLooksLikeDmarc(filename: string): boolean {
  if (!filename) return false
  const lower = filename.toLowerCase()
  if (
    dmarcCandidateConstants.extensions.some((ext: string) =>
      lower.endsWith(ext),
    )
  )
    return true
  return dmarcCandidateConstants.filenameHints.some((hint: string) =>
    lower.includes(hint),
  )
}
