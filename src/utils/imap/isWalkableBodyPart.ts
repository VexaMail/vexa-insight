import type { BodyStructurePart } from '@/types/imap'

/**
 * Type guard: value is a walkable body part object (has type and optional childNodes).
 */
export function isWalkableBodyPart(
  value: unknown,
): value is BodyStructurePart & { childNodes?: BodyStructurePart[] } {
  if (value === null || value === undefined) return false
  if (typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  const type = o['type']
  const hasType = typeof type === 'string'
  const childNodes = o['childNodes']
  const hasChildren = childNodes === undefined || Array.isArray(childNodes)
  return hasType && hasChildren
}
