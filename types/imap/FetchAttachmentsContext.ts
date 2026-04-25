/**
 * Context for fetchAttachments execution: since date, folder list, and optional trash path.
 */
export type FetchAttachmentsContext = {
  since: Date
  folders: string[]
}
