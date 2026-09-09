import type { BodyStructurePart } from '@/types/imap'

/**
 * Part id of a leaf node: its own `partId`, else the walked prefix, else the
 * single-part id `1`.
 */
export function leafPartId(node: BodyStructurePart, prefix: string): string {
  if (node.partId != null && node.partId !== '') return node.partId
  if (prefix) return prefix.replace(/\.$/, '')
  return '1'
}
