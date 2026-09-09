import type { BodyStructurePart } from '@/types/imap'

/**
 * Extracts filename from a MIME part (parameters or dispositionParameters).
 */
export function getPartFilename(part: BodyStructurePart): string | null {
  const params = part.parameters ?? {}
  const disp = part.dispositionParameters ?? {}
  const name =
    params['filename'] ?? params['name'] ?? disp['filename'] ?? disp['name']
  return typeof name === 'string' ? name : null
}
