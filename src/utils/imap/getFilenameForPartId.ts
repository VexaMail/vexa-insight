import { childPartPrefix } from './childPartPrefix'
import { extractFilenameFromNode } from './extractFilenameFromNode'
import { resolvePartId } from './resolvePartId'

export function getFilenameForPartId(
  bodyStructure: unknown,
  partId: string,
  prefix = '',
): string | null {
  if (typeof bodyStructure !== 'object' || bodyStructure === null) return null
  const node = bodyStructure as Record<string, unknown>
  const type = node['type']
  const childNodes = node['childNodes'] as unknown[] | undefined
  if (typeof type !== 'string') return null

  if (Array.isArray(childNodes) && childNodes.length > 0) {
    for (let i = 0; i < childNodes.length; i++) {
      const found = getFilenameForPartId(
        childNodes[i],
        partId,
        childPartPrefix(prefix, i + 1),
      )
      if (found !== null) return found
    }
    return null
  }

  const currentPartId = resolvePartId(node, prefix)
  if (currentPartId !== partId) return null

  return extractFilenameFromNode(node)
}
