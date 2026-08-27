import { filenameLooksLikeDmarc } from './filenameLooksLikeDmarc'
import { getPartFilename } from './getPartFilename'
import { isAcceptedDmarcContentType } from './isAcceptedDmarcContentType'
import { isExcludedDmarcType } from './isExcludedDmarcType'
import { isWalkableBodyPart } from './isWalkableBodyPart'

/**
 * Recursively walks the MIME tree and returns part IDs of leaf parts
 * that look like DMARC report candidates (by content-type and filename).
 */
export function getDmarcCandidatePartIds(
  bodyStructure: unknown,
  prefix = '',
): string[] {
  if (!isWalkableBodyPart(bodyStructure)) return []

  const parts: string[] = []
  const node = bodyStructure
  const children = node.childNodes

  if (children && children.length > 0) {
    children.forEach((child, i) => {
      const partIndex = i + 1
      const nextPrefix = prefix
        ? `${prefix}${String(partIndex)}.`
        : `${String(partIndex)}.`
      parts.push(...getDmarcCandidatePartIds(child, nextPrefix))
    })
    return parts
  }

  const contentType = node.type
  const filename = getPartFilename(node)

  if (isExcludedDmarcType(contentType) && filename !== null) {
    if (!filenameLooksLikeDmarc(filename)) return []
  }
  if (isExcludedDmarcType(contentType) && filename === null) return []

  if (!isAcceptedDmarcContentType(contentType)) return []

  if (filename !== null && !filenameLooksLikeDmarc(filename)) return []

  let partIdStr = '1'
  if (node.partId != null && node.partId !== '') {
    partIdStr = node.partId
  } else if (prefix) {
    partIdStr = prefix.replace(/\.$/, '')
  }
  const partId = partIdStr
  parts.push(partId)
  return parts
}
