import type { BodyStructurePart } from '@/types/imap'

/**
 * Extracts filename from a MIME part (parameters or dispositionParameters).
 */
export function getPartFilename(part: BodyStructurePart): string | null {
  const params = part.parameters ?? {}
  const disp = part.dispositionParameters ?? {}
  const name =
    (params.filename as string) ??
    (params.name as string) ??
    (disp.filename as string) ??
    (disp.name as string)
  return typeof name === 'string' ? name : null
}
