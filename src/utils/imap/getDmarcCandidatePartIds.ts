import { childPartPrefix } from './childPartPrefix'
import { getPartFilename } from './getPartFilename'
import { isDmarcCandidateLeaf } from './isDmarcCandidateLeaf'
import { isWalkableBodyPart } from './isWalkableBodyPart'
import { leafPartId } from './leafPartId'

/**
 * Recursively walks the MIME tree and returns part IDs of leaf parts
 * that look like DMARC report candidates (by content-type and filename).
 */
export function getDmarcCandidatePartIds(
  bodyStructure: unknown,
  prefix = '',
): string[] {
  if (!isWalkableBodyPart(bodyStructure)) return []

  const node = bodyStructure
  const children = node.childNodes

  if (children && children.length > 0) {
    return children.flatMap((child, i) =>
      getDmarcCandidatePartIds(child, childPartPrefix(prefix, i + 1)),
    )
  }

  if (!isDmarcCandidateLeaf(node.type, getPartFilename(node))) return []

  return [leafPartId(node, prefix)]
}
