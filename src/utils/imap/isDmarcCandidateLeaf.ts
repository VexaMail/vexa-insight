import { filenameLooksLikeDmarc } from './filenameLooksLikeDmarc'
import { isAcceptedDmarcContentType } from './isAcceptedDmarcContentType'
import { isExcludedDmarcType } from './isExcludedDmarcType'

/**
 * Whether a leaf MIME part looks like a DMARC report by content-type and
 * filename.
 */
export function isDmarcCandidateLeaf(
  contentType: string,
  filename: string | null,
): boolean {
  if (isExcludedDmarcType(contentType) && filename !== null) {
    if (!filenameLooksLikeDmarc(filename)) return false
  }
  if (isExcludedDmarcType(contentType) && filename === null) return false
  if (!isAcceptedDmarcContentType(contentType)) return false
  if (filename !== null && !filenameLooksLikeDmarc(filename)) return false
  return true
}
