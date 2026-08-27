/**
 * Minimal type for ImapFlow bodyStructure part for walking the MIME tree
 * without depending on imapflow internals.
 */
export type BodyStructurePart = {
  partId: string | null
  type: string
  parameters?: Record<string, string>
  dispositionParameters?: Record<string, string>
  childNodes?: BodyStructurePart[]
}
