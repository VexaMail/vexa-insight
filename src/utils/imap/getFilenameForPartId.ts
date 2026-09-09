import { extractFilenameFromNode } from './extractFilenameFromNode'
import { resolvePartId } from './resolvePartId'

export function getFilenameForPartId(
  bodyStructure: unknown,
  partId: string,
  prefix = '',
): string | null {
  if (bodyStructure === null || bodyStructure === undefined) return null
  if (typeof bodyStructure !== 'object') return null
  const node = bodyStructure as Record<string, unknown>
  const type = node['type']
  const childNodes = node['childNodes'] as unknown[] | undefined
  if (typeof type !== 'string') return null

  if (childNodes && Array.isArray(childNodes) && childNodes.length > 0) {
    for (let i = 0; i < childNodes.length; i++) {
      const partIndex = i + 1
      const nextPrefix = prefix
        ? `${prefix}${String(partIndex)}.`
        : `${String(partIndex)}.`
      const found = getFilenameForPartId(childNodes[i], partId, nextPrefix)
      if (found !== null) return found
    }
    return null
  }

  const currentPartId = resolvePartId(node, prefix)
  if (currentPartId !== partId) return null

  return extractFilenameFromNode(node)
}
